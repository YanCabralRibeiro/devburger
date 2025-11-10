import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api.js"
import { useCart } from "../../hooks/CartContext.jsx"
import { formatPrice } from "../../utils/formatPrice.js"
import { Container } from "./styles";
import { Button } from "../Button";

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [taxa] = useState(500);
    const { cartProducts, clearCart } = useCart();
    const navigate = useNavigate();

    useEffect( () => {
        const sumAllItems = cartProducts.reduce( (acc, current) => {
            return current.price * current.quantity + acc
        }, 0)
        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return {id: product.id, quantity: product.quantity, price: product.price}
        });

        try {
            const { data } = await api.post("/create-payment-intent", { products });
            navigate("/checkout", {
                state: data,
            });
            clearCart();
        } catch (error) {
            toast.error("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="itens">Itens</p>
                    <p className="itensPrice">{formatPrice(finalPrice)}</p>
                    <p className="taxa">Taxa de entrega</p>
                    <p className="taxaPrice">{formatPrice(taxa)}</p>
                </div>
                <div className="container-bottom">
                    <p>Total:</p>
                    <p>{formatPrice(finalPrice + taxa)}</p>
                </div>
            </Container>
            <Button onClick={submitOrder}>Continuar</Button>
        </div>
    );
}