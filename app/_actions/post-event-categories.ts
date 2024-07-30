'use server';

import { db } from '@/server/db';
import { events } from '@/server/db/schema';

interface Props {
  user_id: string;
  event_category_id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  address: string;
}

export async function postEventCategories({
  user_id,
  event_category_id,
  name,
  description,
  start_date,
  end_date,
  address,
}: Props) {
  const insEventCategories = await db.insert(events).values({
    userId: user_id,
    eventCategoryId: event_category_id,
    name: name,
    description: description,
    startDate: start_date,
    endDate: end_date,
    address: address,
  });
}
