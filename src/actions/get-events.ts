import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import React from 'react';

export async function getEvents() {
  const _events = await db
    .select({
      id: events.id,
      name: events.name,
      startDate: events.startDate,
      endDate: events.endDate,
    })
    .from(events);
  //console.log(_events);
  return _events;
}
