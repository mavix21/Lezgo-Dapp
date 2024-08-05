'use server';
import React, { useEffect, useState } from 'react';
import { getEventById } from '../_actions/get-event-by-id';
import { postEvent } from '../_actions/post-event';

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
    const response = await postEvent(params);
    return response;
  } catch (error) {
    console.error('Error in insEvent:', error);
    throw error; // Asegúrate de que el error se propague
  }
}
