import { DomainError } from '@/contexts/shared/domain/abstractions/DomainError';

export class InvalidUserEmail extends DomainError {
  readonly _tag = 'InvalidUserEmail';
  readonly message = 'Invalid user email';
}
