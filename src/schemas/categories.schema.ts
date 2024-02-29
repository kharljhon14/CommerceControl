import { z } from 'zod';

export const AddNewCategorySchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, 'name is required')
    .max(50, 'name must not exceed 50 characters'),
});

export type AddNewCategorySchemaType = z.infer<typeof AddNewCategorySchema>;
