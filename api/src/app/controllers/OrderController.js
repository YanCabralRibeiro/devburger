import * as Yup from 'yup';
import Order from '../schemas/Order.js'
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class OrderController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required()
                })
            )
        });

        try {
            await schema.validate(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors});
        }

        const { products } = req.body;

        const productsIds = products.map((product) => product.id)

        const findProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        })

        const mapedProducts = findProducts.map(product => {
            const productIndex = products.findIndex((p) => p.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity
            }
            
            return newProduct;
        })

        const { userId, userName } = req;

        const order = {
            user: {
                id: userId,
                name: userName
            },
            products: mapedProducts,
            status: 'Pedido realizado'
        };

        const newOrder = await Order.create(order);

        return res.status(201).json(order);
    }

    async update(req, res) {
        const schema = Yup.object({
            status: Yup.string().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false, strict: true });
        } catch (err) {
            return res.status(400).json({ error: err.errors});
        }

        const { status } = req.body;
        const { id } = req.params;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return res.status(400).json({ error: err.message})
        }

        return res.status(200).json({ message: 'Status upadated'});
    }

    async index(req, res) {
        const orders = await Order.find()

        return res.status(200).json(orders);
    }
}

export default new OrderController();