import { Request, Response } from 'express';
import { sql } from '../db';

export async function addCategory(request: Request, response: Response) {
  try {
    await sql('insert into categories (name) values ($1)', [request.body.name]);

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
