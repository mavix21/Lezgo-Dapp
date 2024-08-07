import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { eventCategories, eventTickets, venues } from '.';
import { users } from '.';
import { eventDates } from '.';

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
  name: varchar('name', { length: 200 }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  eventCategoryId: smallint('event_category_id')
    .notNull()
    .references(() => eventCategories.id),
  modality: eventModality('modality').notNull().default('in_person'),
  totalTickets: integer('total_tickets').notNull().default(0),
  venueId: bigint('venue_id', { mode: 'number' })
    .notNull()
    .references(() => venues.id),
  description: text('description').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
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
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  tickets: many(eventTickets, { relationName: 'tickets' }),
  dates: many(eventDates, { relationName: 'dates' }),
}));
