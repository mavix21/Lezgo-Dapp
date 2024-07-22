import { IEventsRepository } from '../../_src/application/repositories';

export class EventsService {
  private _eventsRepository: IEventsRepository;

  constructor(eventsRepository: IEventsRepository) {
    this._eventsRepository = eventsRepository;
  }
}