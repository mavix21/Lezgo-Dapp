import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { event } from '.';

const promoter = pgTable('promoter', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  walletAddress: varchar('wallet_address', { length: 50 }),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName1: varchar('last_name', { length: 50 }).notNull(),
  lastName2: varchar('last_name2', { length: 50 }),
  companyName: varchar('company_name', { length: 50 }).notNull(),
  password: varchar('password', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().default(''),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default promoter;

export const promoterRelations = relations(promoter, ({ many }) => ({
  events: many(event),
}));
