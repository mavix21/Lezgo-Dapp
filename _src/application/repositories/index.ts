import { NewEvent, Event } from '@/server/db/types';

export interface IEventsRepository {
  createEvent(event: NewEvent): Promise<Event>;
}
