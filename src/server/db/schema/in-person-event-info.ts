import { bigserial, pgTable, uuid } from 'drizzle-orm/pg-core';
import events from './events';
import venues from './venues';
import { relations } from 'drizzle-orm';

const inPersonEventInfo = pgTable('in_person_event_info', {
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id)
    .primaryKey(),
  venueId: bigserial('id', { mode: 'number' })
    .notNull()
    .references(() => venues.id),
});

export default inPersonEventInfo;

export const inPersonEventInfoRelations = relations(
  inPersonEventInfo,
  ({ one }) => ({
    event: one(events, {
      fields: [inPersonEventInfo.eventId],
      references: [events.id],
    }),
    venue: one(venues, {
      fields: [inPersonEventInfo.venueId],
      references: [venues.id],
    }),
  }),
);
