import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51SOzOH0yp5dLHWDSL6ZHkJPXfitQR2tcPJCfyNbaLHTYs67BDaPMHA2CNu5JIIPq6bsl4J0V5O5WDcrEPVcPKuph00YTo5kwuA');
import * as Yup from 'yup';

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0);
    return total;
}

class CreatePaymentIntentController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    price: Yup.number().required()
                })
            )
        });

        try {
            await schema.validate(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }
        const { products } = req.body;
        const amount = calculateOrderAmount(products);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "brl",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    }
}

export default new CreatePaymentIntentController();