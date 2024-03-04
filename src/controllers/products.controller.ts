import { Response, Request } from 'express';
import { sql } from '../db';
import { Product } from '../types/product';
import { QueryResult } from 'pg';
import { ProductSchemaType } from '../schemas/product.schema';

export async function getAllProducts(request: Request, response: Response) {
  try {
    const { page, q } = request.query;

    const pageNumber = page as string | undefined;

    const parsedNumber = Math.max(parseInt(pageNumber ?? '0', 10) - 1, 0);

    const limit = 10;
    const offset = parsedNumber * limit;

    let productRes: QueryResult<Product>;

    if (q) {
      productRes = await sql<Product>(
        'select * from products where name ilike $1 limit $2 offset $3',
        [`%${q}%`, limit, offset]
      );
    } else {
      productRes = await sql<Product>('select * from products limit $1 offset $2', [limit, offset]);
    }

    return response.json({ message: 'Success', data: productRes.rows });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function getProduct(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const productRes = await sql('select * from products where id = $1', [id]);

    if (productRes.rowCount === 0)
      return response.status(404).json({ message: 'Could not find product' });

    return response.json({ message: 'Success', data: productRes.rows[0] });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function addProduct(request: Request, response: Response) {
  try {
    const { name, image, description, brand, price, category_id }: ProductSchemaType = request.body;

    await sql(
      'insert into products (name, image, description, brand, price, category_id) values ($1, $2, $3, $4, $5, $6)',
      [name, image, description, brand, price, category_id]
    );
    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}

export async function updateProduct(request: Request, response: Response) {
  try {
    const { id } = request.params;

    const { name, image, description, brand, price, category_id }: ProductSchemaType = request.body;

    const productRes = await sql(
      'update products set name = $1, image = $2, description = $3, brand = $4, price = $5, category_id = $6 where id = $7',
      [name, image, description, brand, price, category_id, id]
    );

    if (productRes.rowCount === 0)
      return response.status(404).json({ message: 'Could not find product' });

    return response.json({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) return response.status(500).json({ message: err.message });
  }
}
