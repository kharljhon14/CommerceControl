import { Request, Response } from 'express';
import { sql } from '../db';

export async function signUp(request: Request, response: Response) {
  try {
    const userRes = await sql('select * from users');

    console.log(userRes.rows);

    return response.json({
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
  }
}
