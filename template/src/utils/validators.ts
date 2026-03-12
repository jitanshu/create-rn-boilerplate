import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'validation.required')
  .email('validation.emailInvalid');

export const passwordSchema = z
  .string()
  .min(8, 'validation.passwordMin');

export const loginSchema = z.object({
  email:    emailSchema,
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    name:            z.string().min(2, 'Name must be at least 2 characters'),
    email:           emailSchema,
    password:        passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'validation.passwordMatch',
    path:    ['confirmPassword'],
  });

export type LoginForm    = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
