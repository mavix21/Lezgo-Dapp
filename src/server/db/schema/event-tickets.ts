import { pgTable, serial } from 'drizzle-orm/pg-core';
import { events } from '@/server/db/schema';

const eventTickets = pgTable('event_tickets', {
  id: serial('id').notNull(),
  eventId: serial('event_id')
    .notNull()
    .references(() => events.id),
});
