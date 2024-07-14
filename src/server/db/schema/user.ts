import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const user = pgTable('user', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletAddress: varchar('wallet_address', { length: 50 }),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default user;
