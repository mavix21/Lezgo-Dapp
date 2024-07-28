import { Event, NewEvent } from '@/entities/models/events';
import { getInjection } from '@/di/container';

export async function createEventUseCase(event: NewEvent): Promise<Event> {
  /*
  const authService = getInjection('IAuthService');
  const user = await authService.getUser();
  * */
  const eventsRepository = getInjection('IEventsRepository');

  return await eventsRepository.createEvent(event);
}
