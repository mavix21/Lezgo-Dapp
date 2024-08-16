import {
  char,
  foreignKey,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { currencies, eventShowtimes } from '.';
import { ticketTypes } from '.';

const tickets = pgTable(
  'tickets',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    eventId: uuid('event_id').notNull(),
    eventDateId: integer('event_date_id').notNull(),
    eventShowtimeId: integer('event_showtime_id').notNull(),
    ticketTypeId: integer('ticket_type_id').notNull(),
    quantity: integer('quantity').notNull(),
    currencyId: char('currency_id', { length: 3 })
      .notNull()
      .references(() => currencies.id),
    quantityAcquired: integer('quantity_acquired').notNull().default(0),
    price: numeric('price', { precision: 7, scale: 2 }),
    sale_starts_at: timestamp('sale_starts_on'),
    sale_ends_on: timestamp('sale_ends_on'),
  },
  (table) => ({
    eventShowtimeReference: foreignKey({
      columns: [table.eventId, table.eventDateId, table.eventShowtimeId],
      foreignColumns: [
        eventShowtimes.eventId,
        eventShowtimes.eventDateId,
        eventShowtimes.id,
      ],
    }),
    ticketTypeReference: foreignKey({
      columns: [table.eventId, table.ticketTypeId],
      foreignColumns: [ticketTypes.eventId, ticketTypes.id],
    }),
  }),
);

export default tickets;

export const ticketRelations = relations(tickets, ({ one }) => ({
  showtime: one(eventShowtimes, {
    fields: [tickets.eventId, tickets.eventDateId, tickets.eventShowtimeId],
    references: [
      eventShowtimes.eventId,
      eventShowtimes.eventDateId,
      eventShowtimes.id,
    ],
    relationName: 'ticketsByShowtime',
  }),
  tycketType: one(ticketTypes, {
    fields: [tickets.eventId, tickets.ticketTypeId],
    references: [ticketTypes.eventId, ticketTypes.id],
  }),
  currency: one(currencies, {
    fields: [tickets.currencyId],
    references: [currencies.id],
  }),
}));
