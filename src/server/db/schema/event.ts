import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { eventCategory, promoter } from '.';

const event = pgTable('event', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  promoterId: uuid('promoter_id')
    .notNull()
    .references(() => promoter.id),
  eventCategoryId: integer('event_category_id')
    .notNull()
    .references(() => eventCategory.id),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default event;

export const eventRelations = relations(event, ({ one }) => ({
  promoter: one(promoter, {
    fields: [event.promoterId],
    references: [promoter.id],
  }),
  category: one(eventCategory, {
    fields: [event.eventCategoryId],
    references: [eventCategory.id],
  }),
}));
