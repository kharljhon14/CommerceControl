import { Request, Response } from 'express';

export async function addCategory(request: Request, response: Response) {
  return response.json({ message: 'Success' });
}
