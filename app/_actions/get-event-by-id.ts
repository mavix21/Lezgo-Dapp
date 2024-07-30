'use server';

import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getEventById(id: string) {
  const _eventById = await db.select().from(events).where(eq(events.id, id));
  return _eventById;
}
