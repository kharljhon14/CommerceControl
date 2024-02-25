import { Response, Request, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { schemaValidator } from '../utils/schemaValidator';

/**
 * Middleware for checking the contents of the request body
 * @param schema
 */

export function validateSchemaBody(schema: ZodSchema) {
  return function (request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;

      const error = schemaValidator(schema, body);

      if (error) return response.status(400).json({ message: error.trim() });

      next();
    } catch (err) {
      if (err instanceof Error) return response.status(500).json({ message: err.message });
    }
  };
}
