'use server';

import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getEventById({
  id,
  promoter_id,
}: {
  id: string;
  promoter_id: string;
}) {
  const _eventById = await db.select().from(events).where(eq(events.id, id));
  //const _eventById = await db.query.events.find
  return _eventById;
}
