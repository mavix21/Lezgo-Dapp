import { relations, sql } from 'drizzle-orm';
import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '.';

const promoters = pgTable('promoter', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  walletAddress: varchar('wallet_address', { length: 50 }),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  middleName: varchar('middle_name', { length: 50 }),
  lastName1: varchar('last_name1', { length: 50 }).notNull(),
  lastName2: varchar('last_name2', { length: 50 }),
  companyName: varchar('company_name', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default promoters;

export const promoterRelations = relations(promoters, ({ one }) => ({
  user: one(users, {
    fields: [promoters.userId],
    references: [users.id],
  }),
}));
