'use server';

import { db } from '@/server/db';
import { eventCategories, events } from '@/server/db/schema';
import { count, eq } from 'drizzle-orm';

export async function getEventsByCategory() {
  const ctg = db.select().from(eventCategories).as('ctg');
  const eventsByCategory = await db
    .select({
      category_name: ctg.name,
      count: count(events.eventCategoryId),
    })
    .from(events)
    .innerJoin(ctg, eq(events.eventCategoryId, ctg.id))
    .groupBy(ctg.name);
  return eventsByCategory;
}
