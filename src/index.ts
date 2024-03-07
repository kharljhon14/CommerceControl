import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRouter from './routers/auth.router';
import productsRouter from './routers/products.router';
import categoriesRouter from './routers/categories.router';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening for port: ${PORT}`));
