import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";

import { Container, ContainerLeft, ContainerRight, Form, InputContainer, Title, Link } from "./styles";
import { Button } from "../../components/Button";
import Logo from "../../assets/logo.svg";

export function Register() {

    const navigate = useNavigate();

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório."),
        email: yup.string().email("Digite um email valido.").required("O email é obrigatório."),
        password: yup.string().min(6, "Coloque no mínimo 6 caracteres.").required("A senha é obrigatório."),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "A senha não está igual.").required("Repita a mesma senha.")
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const { status } = await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password
            },{
                validateStatus: () => true
            });

            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate("/login");
                })
                toast.success("Conta criada com sucesso!");
            } else if (status === 409) {
                toast.error("Email já cadastrado, tente outro.");
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Não foi possível conectar ao servidor.");
        }
    };

    return (
        <Container>
            <ContainerLeft>
                <img src={Logo} alt="logo-devburger" />
            </ContainerLeft>
            <ContainerRight>
                <Title>
                    Crie sua conta no <span>Dev Burguer!</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <InputContainer>
                        <label>Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>
                    <Button type="submit">Criar Conta</Button>
                </Form>
                <p>Já possui conta?<Link to="/login">Clique aqui</Link>.</p>
            </ContainerRight>
        </Container>
    );
}