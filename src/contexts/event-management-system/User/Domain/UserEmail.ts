import { ArgumentNullException } from '@/contexts/shared/domain/errors/ArgumentNullException';
import { InvalidUserEmail } from './Errors/InvalidUserEmail';
import { ValueObject } from '@/contexts/shared/domain/abstractions/ValueObject';

export class UserEmail extends ValueObject {
  private static readonly validEmailRegex =
    /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

  public constructor(public readonly value: string) {
    if (value === undefined || value === null) {
      throw new ArgumentNullException('Email is required');
    }

    if (!UserEmail.validEmailRegex.test(value)) {
      throw new InvalidUserEmail();
    }

    super();
  }
}
