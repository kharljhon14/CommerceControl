import { Request, Response } from 'express';
import { sql } from '../db';
import { Category } from '../types/product';

export async function getCategories(_request: Request, response: Response) {
  try {
    const categoriesRes = await sql<Category>('select * from categories');

    return response.json({ message: 'Success', date: categoriesRes.rows });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function addCategory(request: Request, response: Response) {
  try {
    await sql('insert into categories (name) values ($1)', [request.body.name]);

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
