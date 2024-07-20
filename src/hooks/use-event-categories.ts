// hooks/useEventCategories.ts
'use client';

import { useState, useEffect } from 'react';
import { getEventCategories } from '@/actions/get-event-categories';

export function useEventCategories() {
  const [categories, setCategories] = useState([] as any);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getEventCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
