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
import { eventCategories, inPersonEventInfo } from '.';
import { users } from '.';
import { eventDates } from '.';

export const eventModality = pgEnum('event_modality', [
  'online',
  'in_person',
  'hybrid',
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
  dates: many(eventDates, { relationName: 'dates' }),
  inPersonInfo: one(inPersonEventInfo),
}));
