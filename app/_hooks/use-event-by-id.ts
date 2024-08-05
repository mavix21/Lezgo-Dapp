'use client';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../_actions/get-event-by-id';

export function useEventById(eventId: string) {
  const [loading, setLoading] = useState(true);
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
