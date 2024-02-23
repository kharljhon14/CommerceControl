import { Request, Response } from 'express';
import { schemaValidator } from '../utils/schemaValidator';
import { SignUpSchema } from '../schemas/user.schema';

export async function signUp(request: Request, response: Response) {
  try {
    const { body } = request;

    const res = schemaValidator(SignUpSchema, body);

    if (res) return response.status(400).json({ message: res.trim() });

    return response.json({
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
  }
}
