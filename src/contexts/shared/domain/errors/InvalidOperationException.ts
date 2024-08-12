import { Data } from 'effect';

export class InvalidOperationException extends Data.Error<{
  message: string;
}> {}
