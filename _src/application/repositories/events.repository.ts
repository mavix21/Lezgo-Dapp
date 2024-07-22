import { IEventsRepository } from './index';
import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import type { Event, NewEvent } from '@/server/db/types';

export class EventsRepository implements IEventsRepository {
  private _db;

  constructor() {
    this._db = db;
  }

  public async createEvent({
    promoterId,
    eventCategoryId,
    name,
    description,
    startDate,
    endDate,
    address,
  }: NewEvent) {
    const [newEvent]: Event[] = await this._db
      .insert(events)
      .values({
        promoterId,
        eventCategoryId,
        name,
        description,
        startDate,
        endDate,
        address,
      })
      .returning();

    if (!newEvent) {
      throw new Error('Event not created', { cause: 'unknown' });
    }

    return newEvent;
  }
}
