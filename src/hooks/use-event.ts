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
  try {
    const response = await postEventCategories(params);
    return response;
  } catch (error) {
    console.error('Error in insEvent:', error);
    throw error; // Asegúrate de que el error se propague
  }
}
