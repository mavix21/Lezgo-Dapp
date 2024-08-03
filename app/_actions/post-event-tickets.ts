'use server';

import { db } from '@/server/db';
import { eventTickets } from '@/server/db/schema';

interface Props {
  eventTicketId: number;
  eventId: string;
  currencyId: string;
  name: string;
  numberOfTickets: number;
  ticketPrice: string;
}

export async function postEventTickets({
  eventTicketId,
  eventId,
  currencyId,
  name,
  numberOfTickets,
  ticketPrice,
}: Props) {
  await db.insert(eventTickets).values({
    eventTicketId,
    eventId,
    currencyId,
    name,
    numberOfTickets,
    ticketPrice,
  });
}
