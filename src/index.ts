import express from 'express';
import 'dotenv/config';

import authRouter from './routers/auth.router';
import productsRouter from './routers/products.router';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/products', productsRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening for port: ${PORT}`));
