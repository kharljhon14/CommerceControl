import { Router } from 'express';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories.controller';
import { CategorySchema } from '../schemas/categories.schema';
import { validateSchemaBody } from '../middlewares/schema';

const router = Router();

router.get('/', isAuthenticated, isActivated, getCategories);
router.get('/:id', isAuthenticated, isActivated, getCategory);

router.post('/', isAuthenticated, isActivated, validateSchemaBody(CategorySchema), addCategory);

router.patch(
  '/:id',
  isAuthenticated,
  isActivated,
  validateSchemaBody(CategorySchema),
  updateCategory
);

router.delete('/:id', isAuthenticated, isActivated, deleteCategory);

export default router;
