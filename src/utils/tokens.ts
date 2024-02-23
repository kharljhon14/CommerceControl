import * as jwt from 'jsonwebtoken';
import { SIGN_UP_ACTIVATION_SECRET } from './variables';

type Payload = {
  [key: string]: string;
};

export function createActivationToken(payload: Payload) {
  return jwt.sign(payload, SIGN_UP_ACTIVATION_SECRET, { expiresIn: '5m' });
}
