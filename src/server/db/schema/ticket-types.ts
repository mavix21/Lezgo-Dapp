import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { events } from '.';

const ticketTypes = pgTable(
  'ticket_types',
  {
    id: integer('id').notNull(),
    eventId: uuid('event_id').references(() => events.id),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description').notNull().default(''),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.id, table.eventId],
    }),
    eventIdx: index().on(table.eventId),
  }),
);

export default ticketTypes;

export const ticketTypesRelations = relations(ticketTypes, ({ one }) => ({
  event: one(events, {
    fields: [ticketTypes.eventId],
    references: [events.id],
    relationName: 'ticketTypes',
  }),
}));
