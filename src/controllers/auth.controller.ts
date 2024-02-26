import { Request, Response } from 'express';
import { schemaValidator } from '../utils/schemaValidator';
import {
  ResetPasswordSchemaType,
  SendActivationEmailSchema,
  SendForgotPasswordSchemaType,
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from '../schemas/user.schema';

import { sql } from '../db';
import { comparePassword, hashPassword } from '../utils/helpers';
import { sendActivationTokenEmail, sendForgotPasswordRequestEmail } from '../utils/mailer';
import { User } from '../types/user';
import {
  createActivationToken,
  createAuthToken,
  createForgotPasswordToken,
  verifyForgotPasswordToken,
} from '../utils/tokens';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { error } from 'console';

export async function signIn(request: Request, response: Response) {
  try {
    const body: SignInSchemaType = request.body;

    const userRes = await sql<User>('select id, password from users where email = $1', [
      body.email,
    ]);

    if (userRes.rowCount === 0)
      return response.status(404).json({ message: 'Invalid credentials' });

    const user = userRes.rows[0];

    const match = await comparePassword(body.password, user.password);

    if (!match) return response.status(401).json({ message: 'Invalid credentials' });

    const token = createAuthToken({ id: user.id });
    const oneWeekMilliseconds = 7 * 24 * 60 * 60 * 1000;

    response.cookie('jwt', token, { secure: true, httpOnly: true, maxAge: oneWeekMilliseconds });

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function signUp(request: Request, response: Response) {
  try {
    const signUpBody: SignUpSchemaType = request.body;

    const userRes = await sql<User>('select email from users where email = $1', [signUpBody.email]);

    if (userRes.rowCount !== 0)
      return response.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await hashPassword(signUpBody.password);

    const newUserRes = await sql(
      'insert into users (email, name, password) values ($1, $2, $3) returning email',
      [signUpBody.email, signUpBody.name, hashedPassword]
    );

    return response.json({
      message: 'Success',
      data: newUserRes.rows[0],
    });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function getUser(request: Request, response: Response) {
  try {
    const { userId } = request;

    const userRes = await sql<User>('select id, email, name, activated from users where id = $1', [
      userId,
    ]);

    return response.json({
      message: 'Success',
      data: userRes.rows[0],
    });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function sendActivationEmail(request: Request, response: Response) {
  try {
    const userRes = await sql<User>('select id, email from users where id = $1', [request.body.id]);

    if (userRes.rowCount === 0) return response.status(404).json({ message: 'User not found' });

    const { id, email } = userRes.rows[0];

    // Todo make callback url for account activation

    const token = createActivationToken({ id });

    sendActivationTokenEmail(email, request.body.callback_url);

    return response.json({
      message: 'Success',
      data: {
        token,
      },
    });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function activateAccount(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const userRes = await sql<User>('select * from users where id = $1', [id]);

    if (userRes.rowCount === 0) return response.status(404).json({ message: 'User not found' });

    const user = userRes.rows[0];
    if (user.activated) return response.status(409).json({ message: 'User already activated' });

    await sql('update users set activated = $1 where id = $2', [true, id]);
    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function sendForgotPasswordEmail(request: Request, response: Response) {
  const body: SendForgotPasswordSchemaType = request.body;

  const userRes = await sql<User>('select email, id from users where email = $1', [body.email]);

  if (userRes.rowCount === 0) return response.status(404).json({ message: 'User not found' });

  const user = userRes.rows[0];

  const token = createForgotPasswordToken({ id: user.id });

  sendForgotPasswordRequestEmail(user.email, body.callback_url);

  return response.json({
    message: 'Success',
    data: {
      token,
    },
  });
}

export async function resetPassword(request: Request, response: Response) {
  try {
    const body: ResetPasswordSchemaType = request.body;

    const payload = verifyForgotPasswordToken(body.token) as JwtPayload;

    const userRes = await sql<User>('select password from users where id = $1', [payload.id]);

    if (userRes.rowCount === 0) return response.status(404).json({ message: 'User not found' });

    const match = await comparePassword(body.password, userRes.rows[0].password);

    if (match) return response.status(403).json({ message: 'Password must not be old password' });

    const hashedPassword = await hashPassword(body.password);

    await sql('update users set password = $1 where id = $2', [hashedPassword, payload.id]);

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof JsonWebTokenError)
      return response.status(422).json({
        message: 'Password reset request expired',
      });

    return response.status(500).json({
      message: 'Something went wrong',
    });
  }
}
