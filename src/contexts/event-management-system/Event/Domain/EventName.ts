import { EventNameEmpty } from './Errors/EventNameEmpty';
import { EventNameLengthExceeded } from './Errors/EventNameLengthExceeded';
import { ValueObject } from '@/contexts/shared/domain/abstractions/ValueObject';
import { ArgumentNullException } from '@/contexts/shared/domain/errors/ArgumentNullException';

export class EventName extends ValueObject {
  public static readonly maxLength = 50;

  public constructor(public readonly value: string) {
    if (value === undefined || value === null) {
      throw new ArgumentNullException('Event name is required');
    }

    if (value.trim() === '') {
      throw new EventNameEmpty();
    }

    if (value.length > EventName.maxLength) {
      throw new EventNameLengthExceeded(value, EventName.maxLength);
    }

    super();
  }
}
