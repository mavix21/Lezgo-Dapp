import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { eventCategories, promoters } from '.';

const events = pgTable('event', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  promoterId: integer('promoter_id')
    .notNull()
    .references(() => promoters.id),
  eventCategoryId: integer('event_category_id')
    .notNull()
    .references(() => eventCategories.id),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default events;

export const eventRelations = relations(events, ({ one }) => ({
  promoter: one(promoters, {
    fields: [events.promoterId],
    references: [promoters.id],
  }),
  category: one(eventCategories, {
    fields: [events.eventCategoryId],
    references: [eventCategories.id],
  }),
}));
