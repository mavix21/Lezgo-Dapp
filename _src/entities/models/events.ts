import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string(),
  promoterId: z.number(),
  eventCategoryId: z.number(),
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  address: z.string(),
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
