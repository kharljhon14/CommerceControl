import { Router } from 'express';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { addCategory, getCategories, updateCategory } from '../controllers/categories.controller';
import { CategorySchema } from '../schemas/categories.schema';
import { validateSchemaBody } from '../middlewares/schema';

const router = Router();

router.get('/', isAuthenticated, isActivated, getCategories);

router.post('/', isAuthenticated, isActivated, validateSchemaBody(CategorySchema), addCategory);

router.patch(
  '/:id',
  isAuthenticated,
  isActivated,
  validateSchemaBody(CategorySchema),
  updateCategory
);

export default router;
