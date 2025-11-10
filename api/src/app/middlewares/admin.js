import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const adminMiddleware = (req, res, next) => {
    const isUserAdmin = req.userIsAdmin;

    if (!isUserAdmin) {
        return res.status(401).json({ error: 'Token not provided'});
    }

    return next();
};

export default adminMiddleware;