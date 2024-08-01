import {
  char,
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { currencies, events } from '.';
import { relations } from 'drizzle-orm';

const eventTickets = pgTable(
  'event_tickets',
  {
    eventTicketId: integer('event_ticket_id').notNull(),
    eventId: uuid('event_id')
      .notNull()
      .references(() => events.id),
    currencyId: char('currency_id', { length: 3 })
      .notNull()
      .references(() => currencies.id),
    name: varchar('name', { length: 200 }).notNull(),
    numberOfTickets: integer('number_of_tickets').notNull(),
    ticketPrice: numeric('ticket_price', { precision: 7, scale: 2 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      name: 'tickets_to_events',
      columns: [table.eventTicketId, table.eventId],
    }),
  }),
);

export default eventTickets;

export const eventTicketsRelations = relations(eventTickets, ({ one }) => ({
  currency: one(currencies, {
    fields: [eventTickets.currencyId],
    references: [currencies.id],
  }),
}));
