import {
  foreignKey,
  index,
  integer,
  pgTable,
  primaryKey,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { eventDates } from '.';

const eventShowtimes = pgTable(
  'event_showtime',
  {
    id: integer('id').notNull(),
    eventId: uuid('event_id').notNull(),
    eventDateId: integer('event_date_id').notNull(),
    startTime: time('start_time', { withTimezone: true }).notNull(),
    endTime: time('end_time', { withTimezone: true }),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp('updated_at'),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: 'event_showtime_id',
        columns: [table.eventId, table.eventDateId, table.id],
      }),
      eventDateReference: foreignKey({
        columns: [table.eventId, table.eventDateId],
        foreignColumns: [eventDates.eventId, eventDates.id],
      }),
      eventDateIdx: index('event_date_id_idx').on(
        table.eventId,
        table.eventDateId,
      ),
    };
  },
);

export default eventShowtimes;

export const eventShowtimeRelations = relations(eventShowtimes, ({ one }) => ({
  eventDate: one(eventDates, {
    fields: [eventShowtimes.eventId, eventShowtimes.eventDateId],
    references: [eventDates.eventId, eventDates.id],
    relationName: 'showtimes',
  }),
}));
