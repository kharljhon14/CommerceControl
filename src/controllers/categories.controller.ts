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

export async function updateCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;

    await sql('update categories set name = $1 where id = $2', [request.body.name, id]);

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function deleteCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;

    await sql('delete from categories where id = $1', [id]);

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
