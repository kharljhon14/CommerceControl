import { Router } from 'express';
import { addProduct, getAllProducts } from '../controllers/products.controller';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { validateSchemaBody } from '../middlewares/schema';
import { AddNewProductSchema } from '../schemas/product.schema';

const router = Router();

router.get('/', getAllProducts);
router.post('/', isAuthenticated, isActivated, validateSchemaBody(AddNewProductSchema), addProduct);

export default router;
