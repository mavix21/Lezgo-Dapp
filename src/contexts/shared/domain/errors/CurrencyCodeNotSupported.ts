import { Data } from 'effect';

export class CurrencyCodeNotSupported extends Data.TaggedError(
  'InvalidCurrencyCode',
)<{
  message: string;
  code: string;
}> {}
