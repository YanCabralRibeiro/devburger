import express from 'express';
import routes from './routes.js';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './database/index.js';
import cors from 'cors';
import fs from 'fs';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.json());

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        this.app.use('/product-file',
            express.static(resolve(__dirname, '..', 'src', 'uploads'))
        );
        this.app.use('/category-file',
            express.static(resolve(__dirname, '..', 'src', 'uploads'))
        );
    }

    routes() {
        this.app.use(routes);
    }

}

export default new App().app;