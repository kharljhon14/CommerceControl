import { z } from 'zod';

export const ProductSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, 'name is required')
    .max(50, 'name must not exceed 50 characters'),
  description: z
    .string({ required_error: 'description is required' })
    .min(1, 'description is required')
    .max(255, 'description must not exceed 255 characters'),
  image: z.string().optional(),
  brand: z
    .string({ required_error: 'brand is required' })
    .min(1, 'brand is required')
    .max(50, 'brand must not exceed 50 characters'),
  price: z
    .number({ required_error: 'price is required' })
    .positive()
    .gte(1, 'price is required')
    .lte(9999, 'price must not exceed 9999'),
  category_id: z
    .string({ required_error: 'category_id is required' })
    .min(1, 'category_id is required'),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
