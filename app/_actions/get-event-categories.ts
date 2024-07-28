'use server';

import { db } from '@/server/db';
import { eventCategories } from '@/server/db/schema';

export async function getEventCategories() {
  const _eventCategories = await db.select().from(eventCategories);
  return _eventCategories;
}

// export const getEventCategories = async () => await db.select().from(eventCategories);
