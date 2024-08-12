import { Data } from 'effect';
import { DomainError } from '@/contexts/shared/domain/abstractions/DomainError';

export class ArgumentNullException extends DomainError {
  public readonly _tag = 'NullArgumentException';

  public constructor(public readonly message: string) {
    super();
  }
}
