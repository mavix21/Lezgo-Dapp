import { boolean, char, pgTable, varchar } from 'drizzle-orm/pg-core';

const currencies = pgTable('currency', {
  id: char('id', { length: 3 }).primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  symbol: varchar('symbol', { length: 5 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

export default currencies;
