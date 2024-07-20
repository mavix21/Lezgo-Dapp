'use server';
import { postEventCategories } from '@/actions/post-event-categories';
import React from 'react';

interface Props {
  promoter_id: number;
  event_category_id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  address: string;
}

export async function insEvent(params: Props) {
  const response = await postEventCategories(params);
  return response;
}
