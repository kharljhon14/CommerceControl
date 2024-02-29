import { Router } from 'express';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { addCategory, getCategories } from '../controllers/categories.controller';
import { AddNewCategorySchema } from '../schemas/categories.schema';
import { validateSchemaBody } from '../middlewares/schema';

const router = Router();

router.get('/', isAuthenticated, isActivated, getCategories);

router.post(
  '/',
  isAuthenticated,
  isActivated,
  validateSchemaBody(AddNewCategorySchema),
  addCategory
);

export default router;
