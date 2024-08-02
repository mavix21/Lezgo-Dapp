import { db } from '@/server/db';
import { eventCategories, events } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getEvents() {
  const ctg = db.select().from(eventCategories).as('ctg');
  const _events = await db
    .select({
      id: events.id,
      name: events.name,
      startDate: events.startDate,
      endDate: events.endDate,
      createdAt: events.createdAt,
      category: ctg.name,
    })
    .from(events)
    .where(eq(events.userId, '956c4961-6635-4698-a139-1a93e93e2891'))
    .innerJoin(ctg, eq(events.eventCategoryId, ctg.id));
  //console.log(_events);
  return _events;
}
