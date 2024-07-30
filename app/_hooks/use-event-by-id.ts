'use client';
import { postEventCategories } from '@/app/_actions/post-event-categories';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../_actions/get-event-by-id';

export function useEventById(eventId: string) {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const fetchedCategories = await getEventCategories();
  //       setCategories(fetchedCategories);
  //     } catch (error) {
  //       console.error('Failed to fetch categories:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchCategories();
  // }, []);

  const [eventById, setEvent] = useState([] as any);

  useEffect(() => {
    async function fetchEvent() {
      const fetchedEvent = await getEventById(eventId);
      // Asumiendo que getEventById devuelve un array con un solo elemento
      setEvent(fetchedEvent[0] || null);
    }
    fetchEvent();
  }, [eventId]);

  return { eventById, loading };
}
