import { ZodSchema } from 'zod';

/**
 * Validates the provided `body` against the given Zod schema.
 * @param schema The Zod schema to validate against.
 * @param body The data to be validated.
 * @returns If validation fails, returns a concatenated string of error messages.
 *          Otherwise, returns an empty string indicating successful validation.
 */

export function schemaValidator<T>(schema: ZodSchema, body: T) {
  const res = schema.safeParse(body);

  if (!res.success) {
    let error = '';
    res.error.issues.forEach((issue) => (error = `${error + issue.message} \n `));
    return error;
  }

  return '';
}
