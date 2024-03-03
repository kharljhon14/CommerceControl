import { Router } from 'express';
import { addProduct, getAllProducts } from '../controllers/products.controller';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { validateSchemaBody } from '../middlewares/schema';
import { ProductSchema } from '../schemas/product.schema';

const router = Router();

router.get('/', isAuthenticated, isActivated, getAllProducts);
router.post('/', isAuthenticated, isActivated, validateSchemaBody(ProductSchema), addProduct);

export default router;
