import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Image } from "@phosphor-icons/react";
import { Container, ContainerCheckBox, ErrorMessage, Form, Input, InputGroup, Label, LabelUpload, Select, SubmitButton } from "./styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../services/api.js";
import { toast } from "react-toastify";

const schema = yup
    .object({
        name: yup.string().required("Digite o nome do Produto"),
        price: yup.number().positive().required("Digite o preço do Produto").typeError("Digite o preço do Produto"),
        category: yup.object().required("Coloque a categoria do Produto"),
        offer: yup.bool(),
    })

export function EditProduct() {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
    const {state: {product}} = useLocation();

    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get("/categories");
            setCategories(data);
        }

        loadCategories();
    }, [])

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const productFormData = new FormData();

        productFormData.append("name", data.name);
        productFormData.append("price", data.price);
        productFormData.append("category_id", data.category.id);
        productFormData.append("file", data.file[0]);
        productFormData.append("offer", data.offer);

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: "Editando produto...",
            success: "Produto editado com sucesso!",
            error: "Erro ao editar produto, tente novamente."
        });

        setTimeout(() => {
            navigate("/admin/produtos"); 
        }, 2000);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} defaultValue={product.name} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register("price")} defaultValue={product.price} />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>
                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input type="file" {...register("file")}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value.target.files[0]?.name);
                                register("file").onChange(value);
                            }} />
                        {fileName || "Upload do Produto"}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>
                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller name="category"
                        defaultValue={product.category}
                        control={control}
                        render={( {field} ) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Categorias"
                                menuPortalTarget={document.body}
                                defaultValue={product.category} />
                        )} />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckBox>
                        <input type="checkbox" defaultChecked={product.offer} {...register("offer")} />
                        <Label>Produto em Oferta?</Label>
                    </ContainerCheckBox>
                </InputGroup>
                <SubmitButton>Editar Produto</SubmitButton>
            </Form>
        </Container>
    );
}