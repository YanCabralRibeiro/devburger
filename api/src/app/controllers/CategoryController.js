import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
    // Cria uma nova categoria
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name } = req.body;

        // Verifica se a categoria já existe
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        // Cria a nova categoria
        const category = await Category.create({
            name,
            path: req.file ? req.file.filename : null,
        });

        return res.status(201).json(category);
    }

    // Atualiza uma categoria existente
    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { name } = req.body;
        const { id } = req.params;

        // Monta o novo caminho do arquivo, se houver upload
        let path = undefined;
        if (req.file) {
            const { filename } = req.file;
            path = filename;
        }

        // Verifica se o nome já existe em outra categoria
        if (name) {
            const categoryExists = await Category.findOne({ where: { name } });
            if (categoryExists && categoryExists.id !== Number(id)) {
                return res.status(400).json({ error: 'Category already exists' });
            }
        }

        // Atualiza os campos da categoria
        await Category.update(
            {
                name,
                path,
            },
            {
                where: { id },
            }
        );

        return res.status(200).json({ message: 'Category updated successfully' });
    }

    // Lista todas as categorias
    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

export default new CategoryController();
