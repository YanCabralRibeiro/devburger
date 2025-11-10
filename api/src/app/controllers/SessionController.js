import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(req, res) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        })

        const emailOrPasswordIncorrect = () => {
            return res.status(401).json({ error: 'Make sure your email and password are correct' });
        }

        const isValid = await schema.isValid(req.body);
        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email
            },
        });
        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSomePassword = await user.checkPassword(password);
        console.log(isSomePassword);

        if (!isSomePassword) {
            return emailOrPasswordIncorrect();
        }

        const token = jwt.sign({id: user.id, admin: user.admin, name: user.name}, authConfig.secret, {expiresIn: authConfig.expiresIn});

        return res.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            token
        });
    }
}

export default new SessionController();