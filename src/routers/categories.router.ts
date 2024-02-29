import { Router } from 'express';
import { isActivated, isAuthenticated } from '../middlewares/auth';
import { addCategory } from '../controllers/categories.controller';

const router = Router();

router.post('/', isAuthenticated, isActivated, addCategory);

export default router;
