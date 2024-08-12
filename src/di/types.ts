import type { IEventsRepository } from '@/application/repositories/events-repository.interface';
import type { IAuthenticationService } from '@/contexts/auth/application/services/authentication-service.interface';

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),

  // Repositories
  IEventsRepository: Symbol.for('IEventsRepository'),

  // Use Cases
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  IEventsRepository: IEventsRepository;

  // Use Cases
}
