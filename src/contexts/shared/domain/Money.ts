import { Equal, Data } from 'effect';

import { Currency } from './Currency';
import { InvalidOperationException } from './errors/InvalidOperationException';
import { ArgumentNullException } from '@/contexts/shared/domain/errors/ArgumentNullException';

export class Money extends Data.Class<{ amount: number; currency: Currency }> {
  public constructor(
    public readonly amount: number,
    public readonly currency: Currency,
  ) {
    if (amount === undefined || amount === null) {
      throw new ArgumentNullException({ message: 'Amount is required' });
    }

    super({ amount, currency });
  }

  public static add(first: Money, second: Money): Money {
    if (!Equal.equals(first.currency, second.currency)) {
      throw new InvalidOperationException({
        message: 'Currencies must be the same',
      });
    }

    return new Money(first.amount + second.amount, first.currency);
  }

  public static zero(currency: Currency): Money {
    return new Money(0, currency);
  }

  public isZero(): boolean {
    return this.amount === 0;
  }
}
