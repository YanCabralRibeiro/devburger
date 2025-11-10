import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

class ProductController {
    
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name, price, category_id, offer } = req.body;
        const path = req.file ? req.file.filename : null;

        // Verifica se a categoria existe
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        try {
            const product = await Product.create({
                name,
                price,
                category_id,
                path,
                offer
            });
            return res.status(201).json(product);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            return res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    // Atualiza um produto existente
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { id } = req.params;
        const { name, price, category_id, offer } = req.body;
        const path = req.file ? req.file.filename : null;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Verifica se a categoria existe (se for informada)
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(400).json({ error: 'Category not found' });
            }
        }

        try {
            await Product.update(
                { name, price, category_id, path, offer },
                { where: { id } }
            );
            return res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    // Lista todos os produtos
    async index(req, res) {
        const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });
        return res.status(200).json(products);
    }

    // Mostra um produto específico
    async show(req, res) {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    }
}

export default new ProductController();
