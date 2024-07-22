import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { logInSchema } from '@/app/(dapp)/(auth)/_lib/zod';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { users } from '@/server/db/schema';
import bcrypt from 'bcryptjs';

export const BASE_PATH = '/api/auth';

const config: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = logInSchema.safeParse(credentials);

        if (!success) {
          throw new Error('Invalid credentials');
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, data.email),
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        // verify password
        const isValid = await bcrypt.compare(data.password, user.password);

        return user;
      },
    }),
  ],
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/promoter/dashboard');
  //     if (isOnDashboard) {
  //       return isLoggedIn;
  //       // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl));
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;

export default config;
