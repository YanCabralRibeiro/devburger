import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';
import authMiddleware from './app/middlewares/auth.js';
import adminMiddleware from './app/middlewares/admin.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware, upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductController.update);

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;