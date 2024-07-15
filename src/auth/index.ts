import NextAuth from 'next-auth';
import config from './auth.config';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/server/db';
import Credentials from 'next-auth/providers/credentials';
import { sessions, users, verificationTokens } from '@/server/db/schema';
import { accounts } from '@/server/db/schema/accounts';

export { default as authConfig, BASE_PATH } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...config,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Credentials({})],
});
