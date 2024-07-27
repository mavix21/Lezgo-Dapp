import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { logInSchema } from '@/app/(dapp)/(auth)/_lib/zod';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { users } from '@/server/db/schema';
import bcrypt from 'bcryptjs';
import Google from '@auth/core/providers/google';

export const BASE_PATH = '/api/auth';

const config: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      authorize: async (credentials, request) => {
        console.log(credentials);
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      console.log('session callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
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
