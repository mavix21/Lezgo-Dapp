'use server';

import 'server-only';
import { z } from 'zod';
import { logInSchema } from '@/app/(dapp)/(auth)/_lib/zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const loginAction = async ({
  email,
  password,
}: z.infer<typeof logInSchema>) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.cause?.err?.message };
    }
    return { error: 'An error occurred' };
  }
};

export default loginAction;
