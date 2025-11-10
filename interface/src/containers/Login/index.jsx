import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/UserContext";

import { Container, ContainerLeft, ContainerRight, Form, InputContainer, Title, Link } from "./styles";
import { Button } from "../../components/Button";
import Logo from "../../assets/logo.svg";

export function Login() {
    const navigate = useNavigate();
    const { putUserData } = useUser();

    const schema = yup.object({
        email: yup.string().email("Digite um email valido.").required("O email é obrigatório."),
        password: yup.string().min(6, "Coloque no mínimo 6 caracteres.").required("A senha é obrigatório.")
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const { data: userData } = await toast.promise(
            api.post("/sessions", {
                email: data.email,
                password: data.password
            }),
            {
                pending: "Verificando seus dados...",
                success: {
                    render() {
                        setTimeout(() => {
                            if (userData?.admin) {
                                navigate("/admin/pedidos");
                            } else {
                                navigate("/home");
                            }
                            
                        }, 2000);
                        return "Login realizado com sucesso!"
                    }},
                error: "Informações incorretas, tente novamente."
            });
            putUserData(userData);
    }

    return (
        <Container>
            <ContainerLeft>
                <img src={Logo} alt="logo-devburger" />
            </ContainerLeft>
            <ContainerRight>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")}/>
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")}/>
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button  type="submit">Entrar</Button>
                </Form>
                <p>Não possui conta?<Link to="/cadastro">Clique aqui</Link>.</p>
            </ContainerRight>
        </Container>
    );
}