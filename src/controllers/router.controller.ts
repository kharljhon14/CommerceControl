import { Response, Request } from 'express';
import { sql } from '../db';
import { Product } from '../types/product';
export async function getAllProducts(request: Request, response: Response) {
  try {
    const { page } = request.query;

    const pageNumber = page as string | undefined;

    const parsedNumber = Math.max(parseInt(pageNumber ?? '0', 10) - 1, 0);

    const limit = 10;
    const offset = parsedNumber * limit;

    const productRes = await sql<Product>('select * from products limit $1 offset $2', [
      limit,
      offset,
    ]);

    return response.json({ message: 'Success', data: productRes.rows });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
