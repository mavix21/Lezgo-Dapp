import {
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { events, eventShowtimes } from '.';

const eventDates = pgTable(
  'event_date',
  {
    id: integer('id'),
    eventId: uuid('event_id')
      .notNull()
      .references(() => events.id),
    date: date('date', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp('updated_at'),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: 'event_date_id',
        columns: [table.eventId, table.id],
      }),
      eventIdx: index('event_id_idx').on(table.eventId),
    };
  },
);

export default eventDates;

export const eventDateRelations = relations(eventDates, ({ one, many }) => ({
  event: one(events, {
    fields: [eventDates.eventId],
    references: [events.id],
    relationName: 'dates',
  }),
  eventShowtimes: many(eventShowtimes, { relationName: 'showtimes' }),
}));
