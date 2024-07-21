import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const users = pgTable('user', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletAddress: varchar('wallet_address', { length: 50 }),
  name: varchar('name', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 50 }),
  email: varchar('email').notNull().unique(),
  emailVerified: timestamp('email_verified_at', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default users;
