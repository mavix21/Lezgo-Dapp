import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import events from './events';
import { relations } from 'drizzle-orm';

const virtualEventInfo = pgTable('virtual_event_info', {
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id)
    .primaryKey(),
  meetingLink: text('meeting_link').notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
});

export default virtualEventInfo;

export const virtualEventInfoRelations = relations(
  virtualEventInfo,
  ({ one }) => ({
    event: one(events),
  }),
);
