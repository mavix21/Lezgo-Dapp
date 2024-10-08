'use server';

import { db } from '@/server/db';
import { events } from '@/server/db/schema';

interface Props {
  userId: string;
  eventCategoryId: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  address: string;
  createdAt: Date;
}

export async function postEvent({
  userId,
  eventCategoryId,
  name,
  description,
  startDate,
  endDate,
  address,
  createdAt,
}: Props) {
  const insEvent = await db
    .insert(events)
    .values({
      userId: userId,
      eventCategoryId: eventCategoryId,
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      createdAt: createdAt,
      venueId: 0,
    })
    .returning({ insertedId: events.id });
  return insEvent;
}
