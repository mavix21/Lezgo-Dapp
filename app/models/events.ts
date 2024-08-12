import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventCategoryId: z.number(),
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  address: z.string().nullable(),
  eventModality: z.enum(['online', 'in_person', 'hybrid']),
  eventPlatform: z
    .enum([
      'zoom',
      'teams',
      'meet',
      'discord',
      'twitter',
      'decentraland',
      'other',
    ])
    .nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type Event = z.infer<typeof EventSchema>;

export const NewEventSchema = EventSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type NewEvent = z.infer<typeof NewEventSchema>;
