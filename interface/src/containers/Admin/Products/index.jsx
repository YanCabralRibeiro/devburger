import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { api } from "../../../services/api.js";
import { Container, EditButton, ImageProduct } from "./styles.js";
import { formatPrice } from "../../../utils/formatPrice.js"
import { CheckCircle, Pencil, XCircle } from 'phosphor-react';


export function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get("/products");

            setProducts(data);
        }

        loadProducts();
    }, []);

    function isOffer(offer) {
        if(offer) {
            return <CheckCircle color='#9758a6' size={28}/>
        } else {
            return <XCircle color='#9758a6' size={28}/>
        }
    }

    function editProduct(product) {
        navigate("/admin/editar-produto", {state: {product}});
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center">Imagem do Produto</TableCell>
                            <TableCell align="center">Editar Produto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align="right">{formatPrice(product.price)}</TableCell>
                                <TableCell align="right">{isOffer(product.offer)}</TableCell>
                                <TableCell align="right"><ImageProduct src={product.url}/></TableCell>
                                <TableCell align="right">
                                    <EditButton onClick={() => editProduct(product)}>
                                        <Pencil />
                                    </EditButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}