import { Router } from 'express';
import { addProduct, getAllProducts } from '../controllers/router.controller';
import { isActivated, isAuthenticated } from '../middlewares/auth';

const router = Router();

router.get('/', getAllProducts);
router.post('/', isAuthenticated, isActivated, addProduct);

export default router;
