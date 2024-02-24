import { Router } from 'express';
import {
  activateAccount,
  sendActivationEmail,
  signIn,
  signUp,
} from '../controllers/auth.controller';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/send-activation/', sendActivationEmail);
router.post('/activate/:id', activateAccount);

export default router;
