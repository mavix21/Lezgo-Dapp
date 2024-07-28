import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import { IEventsRepository } from '@/application/repositories/events-repository.interface';
import { Event, EventSchema, NewEvent } from '@/entities/models/events';
import { injectable } from 'inversify';

@injectable()
export class EventsRepository implements IEventsRepository {
  constructor() {}

  public async createEvent({
    promoterId,
    eventCategoryId,
    name,
    description,
    startDate,
    endDate,
    address,
  }: NewEvent) {
    const [eventCreated]: Event[] = await db
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

    if (!eventCreated) {
      throw new Error('Event not created', { cause: 'unknown' });
    }

    return EventSchema.parse(eventCreated);
  }
}
