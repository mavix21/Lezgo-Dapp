import { Console, Data, Effect } from 'effect';
import { DomainError } from '@/contexts/shared/domain/abstractions/DomainError';

export class EventNameLengthExceeded extends DomainError {
  readonly _tag = 'EventNameLengthExceeded';
  readonly message = `The event name <<< ${this.eventName} >>> is longer than ${this.maxLength} characters`;

  public constructor(
    public readonly eventName: string,
    public readonly maxLength: number,
  ) {
    super();
  }
}

// try {
//   const myError = new EventNameLengthExceeded('My Event Name', 50);
//   console.log(myError instanceof Error);
//   console.log(myError);
//   console.log(myError.message);
// } catch (err) {}

const program = Effect.gen(function* () {
  yield* new EventNameLengthExceeded('My Event Name', 50);
}); /*.pipe(
  Effect.catchTag('EventNameLengthExceeded', (err) =>
    // Console.error(`${err.message}`)
    Console.error(err),
  ),
);*/

Effect.runPromise(program);
