import { Router } from 'express';
import { getAllProducts } from '../controllers/router.controller';

const router = Router();

router.get('/', getAllProducts);

export default router;
