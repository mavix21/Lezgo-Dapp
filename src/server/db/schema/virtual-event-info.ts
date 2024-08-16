import { pgEnum, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import events from './events';
import { relations } from 'drizzle-orm';

export const eventPlatform = pgEnum('event_platform', [
  'zoom',
  'teams',
  'meet',
  'discord',
  'twitter',
  'decentraland',
  'other',
]);

const virtualEventInfo = pgTable('virtual_event_info', {
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id)
    .primaryKey(),
  meetingLink: text('meeting_link').notNull(),
  platform: eventPlatform('platform').notNull(),
});

export default virtualEventInfo;

export const virtualEventInfoRelations = relations(
  virtualEventInfo,
  ({ one }) => ({
    event: one(events, {
      fields: [virtualEventInfo.eventId],
      references: [events.id],
    }),
  }),
);
