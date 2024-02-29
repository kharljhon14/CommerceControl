import { Router } from 'express';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { addCategory } from '../controllers/categories.controller';
import { AddNewCategorySchema } from '../schemas/categories.schema';
import { validateSchemaBody } from '../middlewares/schema';

const router = Router();

router.post(
  '/',
  isAuthenticated,
  isActivated,
  validateSchemaBody(AddNewCategorySchema),
  addCategory
);

export default router;
