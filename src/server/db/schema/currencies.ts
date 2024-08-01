import { char, pgTable, varchar } from 'drizzle-orm/pg-core';

const currencies = pgTable('currency', {
  id: char('id', { length: 3 }).primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
});

export default currencies;
