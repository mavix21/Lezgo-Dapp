import { Data } from 'effect';

import { CurrencyCodeNotSupported } from './errors/CurrencyCodeNotSupported';
import { ArgumentNullException } from './errors/ArgumentNullException';

export class Currency extends Data.Class<{ code: string }> {
  private static readonly None = new Currency('');
  public static readonly PEN = new Currency('PEN');
  public static readonly USD = new Currency('USD');
  public static readonly EUR = new Currency('EUR');

  public static readonly All: ReadonlyArray<Currency> = [
    Currency.USD,
    Currency.EUR,
    Currency.PEN,
  ];

  private constructor(public readonly code: string) {
    if (code === undefined || code === null) {
      throw new ArgumentNullException('Currency code is required');
    }

    super({ code });
  }

  public static fromCode(code: string): Currency {
    const currency = Currency.All.find((c) => c.code === code);
    if (!currency) {
      throw new CurrencyCodeNotSupported({
        message: `Currency with code ${code} not found`,
        code: code,
      });
    }

    return currency;
  }
}
