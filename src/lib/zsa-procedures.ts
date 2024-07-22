import { createServerActionProcedure } from 'zsa';
import { EventsRepository } from '../../_src/application/repositories/events.repository';
import { EventsService } from '@/services/events-service';

export const baseProcedure = createServerActionProcedure().handler(() => {
  const eventsRepository = new EventsRepository();
  const eventsService = new EventsService(eventsRepository);

  return { eventsService };
});
