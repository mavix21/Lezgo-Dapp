import { DomainError } from '@/contexts/shared/domain/abstractions/DomainError';

export class EventNameEmpty extends DomainError {
  readonly _tag = 'EventNameEmpty';
  readonly message = 'Event name is empty';
}
