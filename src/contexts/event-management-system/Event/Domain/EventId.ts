import { ValueObject } from '@/contexts/shared/domain/abstractions/ValueObject';

export class EventId extends ValueObject {
  public constructor(public readonly value: string) {
    super();
  }
}
