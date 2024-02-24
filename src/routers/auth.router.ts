import { Router } from 'express';
import {
  activateAccount,
  getUser,
  sendActivationEmail,
  signIn,
  signUp,
} from '../controllers/auth.controller';
import { isActivated, isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.get('/user', isAuthenticated, getUser);
router.post('/send-activation/', sendActivationEmail);
router.post('/activate/:id', activateAccount);

export default router;
