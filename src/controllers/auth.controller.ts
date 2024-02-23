import { Request, Response } from 'express';
import { schemaValidator } from '../utils/schemaValidator';
import { SignUpSchema, SignUpSchemaType } from '../schemas/user.schema';

import { sql } from '../db';
import { hashPassword } from '../utils/helpers';

export async function signUp(request: Request, response: Response) {
  try {
    const params = request.url;

    const signUpBody: SignUpSchemaType = request.body;

    const res = schemaValidator(SignUpSchema, signUpBody);

    if (res) return response.status(400).json({ message: res.trim() });

    const userRes = await sql('select email from users where email = $1', [signUpBody.email]);

    if (userRes.rowCount !== 0)
      return response.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await hashPassword(signUpBody.password);

    const newUserRes = await sql(
      'insert into users (email, name, password) values ($1, $2, $3) returning email',
      [signUpBody.email, signUpBody.name, hashedPassword]
    );

    return response.json({
      data: newUserRes.rows[0],
    });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
