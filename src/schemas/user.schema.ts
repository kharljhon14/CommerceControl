import { z } from 'zod';

export const SignUpSchema = z
  .object({
    email: z
      .string({ required_error: 'email is required' })
      .min(1, 'email is required')
      .max(64, 'email must not exceed 64 characters')
      .email(),
    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'name is required')
      .max(32, 'name must not exceed 32 characters'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'password must be at least 8 characters long')
      .max(64, 'password must not exceed 64 character')
      .regex(/^(?=.*[A-Z])/, 'password must contain at least one uppercase letter')
      .regex(/^(?=.*\d)/, 'password must contain at least one numeric digit')
      .regex(/^(?=.*[!@#$%^&*()_+])/, 'password must contain at least one special character'),
    confirm_password: z
      .string({ required_error: 'confirm_password is required' })
      .min(8, 'confirm password must be at least 8 characters long')
      .max(64, 'confirm password must not exceed 64 character')
      .regex(/^(?=.*[A-Z])/, 'confirm password must contain at least one uppercase letter')
      .regex(/^(?=.*\d)/, 'confirm password must contain at least one numeric digit')
      .regex(
        /^(?=.*[!@#$%^&*()_+])/,
        'confirm password must contain at least one special character'
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "passwords doesn't match",
    path: ['confirm_password'],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SendActivationEmailSchema = z.object({
  id: z.string({ required_error: 'id is required' }).uuid({ message: 'Invalid id' }),
  callback_url: z
    .string({ required_error: 'callback_url is required' })
    .url({ message: 'Invalid URL' }),
});

export type SendActivationEmailSchemaType = z.infer<typeof SendActivationEmailSchema>;
