import { Router } from 'express';
import { getAllProducts } from '../controllers/router.controller';

const router = Router();

router.post('/', getAllProducts);

export default router;
