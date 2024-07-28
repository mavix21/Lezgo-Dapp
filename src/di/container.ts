import { Container } from 'inversify';
import { EventsModule } from './modules/event.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

const ApplicationContainer = new Container({
  defaultScope: 'Singleton',
});

const initializeContainer = () => {
  ApplicationContainer.load(EventsModule);
};

initializeContainer();

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  key: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(key);
}

export { ApplicationContainer };
