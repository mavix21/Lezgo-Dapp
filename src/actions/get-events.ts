import { db } from '@/server/db';
import { eventCategories, events } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getEvents() {
  const ctg = await db.select().from(eventCategories).as('ctg');
  const _events = await db
    .select({
      id: events.id,
      name: events.name,
      startDate: events.startDate,
      endDate: events.endDate,
      category: ctg.name,
    })
    .from(events)
    .where(eq(events.promoterId, 2))
    .innerJoin(ctg, eq(events.eventCategoryId, ctg.id));
  //console.log(_events);
  return _events;
}
