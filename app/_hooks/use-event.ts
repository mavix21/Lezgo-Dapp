'use server';
import { postEventCategories } from '@/app/_actions/post-event-categories';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../_actions/get-event-by-id';

interface Props {
  userId: string;
  eventCategoryId: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  address: string;
  createdAt: Date;
}

export async function insEvent(params: Props) {
  try {
    const response = await postEventCategories(params);
    return response;
  } catch (error) {
    console.error('Error in insEvent:', error);
    throw error; // Asegúrate de que el error se propague
  }
}

// export function useEventById(eventId: string) {
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   async function fetchCategories() {
//   //     try {
//   //       const fetchedCategories = await getEventCategories();
//   //       setCategories(fetchedCategories);
//   //     } catch (error) {
//   //       console.error('Failed to fetch categories:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }

//   //   fetchCategories();
//   // }, []);

//   const [eventById, setEvent] = useState([] as any);

//   useEffect(() => {
//     async function fetchEvent() {
//       const fetchedEvent = await getEventById(eventId);
//       // Asumiendo que getEventById devuelve un array con un solo elemento
//       setEvent(fetchedEvent[0] || null);
//     }
//     fetchEvent();
//   }, [eventId]);

//   return { eventById, loading };
// }
