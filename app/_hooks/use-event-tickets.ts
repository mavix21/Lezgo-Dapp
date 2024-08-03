'use server';

import { postEventTickets } from '../_actions/post-event-tickets';

interface Props {
  eventTicketId: number;
  eventId: string;
  currencyId: string;
  name: string;
  numberOfTickets: number;
  ticketPrice: string;
}

export async function insEventTickets(params: Props) {
  try {
    await postEventTickets(params);
  } catch (error) {
    console.error('Error in insEventTickets:', error);
    throw error; // Asegúrate de que el error se propague
  }
}
