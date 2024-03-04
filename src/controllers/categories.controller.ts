import { Request, Response } from 'express';
import { sql } from '../db';
import { Category } from '../types/product';
import { DatabaseError } from 'pg';

export async function getCategories(_request: Request, response: Response) {
  try {
    const categoriesRes = await sql<Category>('select * from categories');

    return response.json({ message: 'Success', date: categoriesRes.rows });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function getCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const categoriesRes = await sql<Category>('select * from categories where id = $1', [id]);

    if (categoriesRes.rowCount === 0)
      return response.status(404).json({ message: 'Could not find category' });

    return response.json({ message: 'Success', date: categoriesRes.rows[0] });
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

    const categoriesRes = await sql('update categories set name = $1 where id = $2', [
      request.body.name,
      id,
    ]);

    if (categoriesRes.rowCount === 0)
      return response.status(404).json({ message: 'Could not find category' });

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function deleteCategory(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const categoriesRes = await sql('delete from categories where id = $1', [id]);

    if (categoriesRes.rowCount === 0)
      return response.status(404).json({ message: 'Could not find category' });

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23503')
        return response.status(409).json({ message: 'Catergory still in use' });
    }
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
