import { Request, Response } from 'express';
import { schemaValidator } from '../utils/schemaValidator';
import { SignUpSchema, SignUpSchemaType } from '../schemas/user.schema';

import { sql } from '../db';
import { hashPassword } from '../utils/helpers';
import { sendActivationTokenEmail } from '../utils/mailer';
import { User } from '../types/user';

export async function signUp(request: Request, response: Response) {
  try {
    const signUpBody: SignUpSchemaType = request.body;

    const res = schemaValidator(SignUpSchema, signUpBody);

    if (res) return response.status(400).json({ message: res.trim() });

    const userRes = await sql<User>('select email from users where email = $1', [signUpBody.email]);

    if (userRes.rowCount !== 0) {
      const user = userRes.rows[0];

      if (!user.activated) {
        const url = `http://localhost:8000/${user.id}`;

        sendActivationTokenEmail(user.email, url);
        return response
          .status(409)
          .json({ message: 'Email already exists, please check you email to activate' });
      }

      return response.status(409).json({ message: 'Email already exists' });
    }

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

export async function sendActivationEmail(request: Request, response: Response) {
  try {
    const userRes = await sql<User>('select id, email from users where id = $1', [request.body.id]);

    if (userRes.rowCount === 0) return response.status(404).json({ message: 'User not found' });

    const { id, email } = userRes.rows[0];

    sendActivationTokenEmail(email, request.body.callback_url);
    return response.json({
      message: 'Success',
      data: {
        user_id: id,
        callback_url: request.body.callback_url,
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
