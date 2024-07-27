import { Event, NewEvent } from '../../entities/models/events';

export interface IEventsRepository {
  createEvent(event: NewEvent): Promise<Event>;
}
