import { db } from '@/server/db';
import { events } from '@/server/db/schema';
import { IEventsRepository } from '@/application/repositories/events-repository.interface';
import { Event, EventSchema, NewEvent } from '@/entities/models/events';
import { injectable } from 'inversify';

@injectable()
export class EventsRepository implements IEventsRepository {
  constructor() {}

  public async createEvent({
    userId,
    eventCategoryId,
    name,
    description,
    startDate,
    endDate,
    address,
    eventModality,
    eventPlatform,
  }: NewEvent) {
    const [eventCreated]: Event[] = await db
      .insert(events)
      .values({
        userId,
        eventCategoryId,
        name,
        description,
        startDate,
        endDate,
        address,
        eventModality,
        eventPlatform,
      })
      .returning();

    if (!eventCreated) {
      throw new Error('Event not created', { cause: 'unknown' });
    }

    return EventSchema.parse(eventCreated);
  }
}
