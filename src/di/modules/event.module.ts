import { ContainerModule, interfaces } from 'inversify';
import { IEventsRepository } from '@/application/repositories/events-repository.interface';
import { DI_SYMBOLS } from '../types';
import { PostgreSql } from '@/infrastructure/repositories/postgresql';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IEventsRepository>(DI_SYMBOLS.IEventsRepository).to(
    PostgreSql.EventsRepository,
  );
};

export const EventsModule = new ContainerModule(initializeModule);
