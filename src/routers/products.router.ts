import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/products.controller';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { validateSchemaBody } from '../middlewares/schema';
import { ProductSchema } from '../schemas/product.schema';

const router = Router();

router.get('/', isAuthenticated, isActivated, getAllProducts);
router.get('/:id', isAuthenticated, isActivated, getProduct);
router.post('/', isAuthenticated, isActivated, validateSchemaBody(ProductSchema), addProduct);
router.patch(
  '/:id',
  isAuthenticated,
  isActivated,
  validateSchemaBody(ProductSchema),
  updateProduct
);

router.delete('/:id', isAuthenticated, isActivated, deleteProduct);

export default router;
