import { Request, Response } from 'express';
import { schemaValidator } from '../utils/schemaValidator';
import { SignUpSchema, SignUpSchemaType } from '../schemas/user.schema';
import { sendVerificationEmail } from '../utils/mailer';
import { sql } from '../db';
import { createSignUpToken } from '../utils/tokens';

export async function signUp(request: Request, response: Response) {
  try {
    const signUpBody: SignUpSchemaType = request.body;

    const res = schemaValidator(SignUpSchema, signUpBody);

    if (res) return response.status(400).json({ message: res.trim() });

    const userRes = await sql('select email from users where email = $1', [signUpBody.email]);

    if (userRes.rowCount !== 0)
      return response.status(409).json({ message: 'Email already exists' });

    const { email, password, name } = signUpBody;

    const token = createSignUpToken({ email, password, name });

    const url = `http:localhost:8000/activate/${token}`;

    sendVerificationEmail({ email, url });

    return response.json({
      message: 'Success. Please check you email',
    });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
