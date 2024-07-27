import { z } from 'zod';

export const signInWithCredentialsFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type signInWithCredentialsFormInput = z.infer<
  typeof signInWithCredentialsFormSchema
>;

export const signUpWithCredentialsFormSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required'),
    email: z
      .string({ required_error: 'Email is required' })
      .min(1, 'Email is required')
      .email('Invalid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z
      .string({ required_error: 'Confirm Password is required' })
      .min(1, 'Confirm Password is required')
      .min(8, 'Confirm Password must be at least 8 characters')
      .max(32, 'Confirm Password must be less than 32 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['password'],
      });
    }
  });

export type signUpWithCredentialsFormInput = z.infer<
  typeof signUpWithCredentialsFormSchema
>;
