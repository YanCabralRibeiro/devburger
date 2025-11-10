import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import "../styles.css"
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api.js";
import { toast } from "react-toastify";

export default function CheckoutForm() {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink } } = useLocation();

    const { cartProducts, clearCart } = useCart();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Houve um erro no Elements, tente novamente.");
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });
        if (error) {
            setMessage(error.message);
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                const products = cartProducts.map((product) => {
                    return { id: product.id, quantity: product.quantity, price: product.price }
                });
                const { status } = await api.post("/orders", { products }, {
                    validateStatus: () => true

                });
                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
                        clearCart();
                    }, 2000);
                    toast.success("Pedido feito com sucesso!");
                } else if (status === 409) {
                    toast.error("Falha ao realizar pedido.");
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast.error("Não foi possível conectar ao servidor.");
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div className="Container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}