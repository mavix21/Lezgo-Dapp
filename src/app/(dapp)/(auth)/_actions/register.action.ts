'use server';

import 'server-only';
import { z } from 'zod';
import { registerSchema } from '@/app/(dapp)/(auth)/_lib/zod';
import { AuthError } from 'next-auth';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { users } from '@/server/db/schema';
import bcrypt from 'bcryptjs';

const registerAction = async (values: z.infer<typeof registerSchema>) => {
  const { data, success } = registerSchema.safeParse(values);

  if (!success) {
    return { error: 'Invalid data' };
  }

  // Verify if the user already exists
  const user = await db.query.users.findFirst({
    where: eq(users.email, data.email),
  });

  const password = await bcrypt.hash(data.password, 10);

  try {
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.cause?.err?.message };
    }
    return { error: 'An error occurred' };
  }
};

export default registerAction;
