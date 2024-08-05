'use client';
import { useEffect, useState } from 'react';
import { getEventsByCategory } from '../_actions/get-events-by-categories';

export function useEventsByCategory() {
  const [loading, setLoading] = useState(true);
  const [eventByCategory, setEventByCategory] = useState([] as any);

  useEffect(() => {
    async function fetchEventByCategory() {
      try {
        const fetchedEventByCategory = await getEventsByCategory();
        setEventByCategory(fetchedEventByCategory);
      } catch (error) {
        console.error('Failed to fetch events by category: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventByCategory();
  }, []);

  return { eventByCategory, loading };
}
