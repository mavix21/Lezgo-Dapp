import { NextResponse } from 'next/server';
import { db } from '@/server/db';

// To handle a GET request to /api
export async function GET(request: any) {
  const events = await db.query.events.findMany({
    with: {
      dates: {
        with: {
          eventShowtimes: true,
        },
      },
    },
  });
  console.log(events);

  return NextResponse.json({ message: events[0] }, { status: 200 });
}
