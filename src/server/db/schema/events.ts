import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { eventCategories, eventTickets } from '.';
import users from '@/server/db/schema/users';

export const eventModality = pgEnum('event_modality', [
  'online',
  'in_person',
  'hybrid',
]);

export const eventPlatform = pgEnum('event_platform', [
  'zoom',
  'teams',
  'meet',
  'discord',
  'twitter',
  'decentraland',
  'other',
]);

const events = pgTable('event', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  eventCategoryId: integer('event_category_id')
    .notNull()
    .references(() => eventCategories.id),
  eventModality: eventModality('event_modality').notNull().default('in_person'),
  eventPlatform: eventPlatform('event_platform'),
  totalTickets: integer('total_tickets').notNull().default(0),
  name: varchar('name', { length: 50 }).notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  address: varchar('address', { length: 255 }),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at'),
});

export default events;

export const eventRelations = relations(events, ({ one, many }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
  category: one(eventCategories, {
    fields: [events.eventCategoryId],
    references: [eventCategories.id],
  }),
  tickets: many(eventTickets),
}));
