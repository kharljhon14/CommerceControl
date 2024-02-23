import { Router } from 'express';
import { sendActivationEmail, signUp } from '../controllers/auth.controller';

const router = Router();

router.post('/sign-up', signUp);
router.post('/send-activation/', sendActivationEmail);

export default router;
