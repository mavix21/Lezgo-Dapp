import { EventName } from './EventName';
import { EventId } from './EventId';

export class Event {
  private constructor(
    public readonly id: EventId,
    private readonly name: EventName,
  ) {}

  public static create(id: string, name: string): Event {
    return new Event(new EventId(id), new EventName(name));
  }
}
