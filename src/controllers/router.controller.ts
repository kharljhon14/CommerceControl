import { Response, Request } from 'express';
import { sql } from '../db';
export async function getAllProducts(request: Request, response: Response) {
  // Todo get page from request query
  const page = 0;
  const limit = 10;
  const offset = page * limit;

  return response.json({ message: 'Success' });
}
