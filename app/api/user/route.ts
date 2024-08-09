import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// To handle a GET request to /api
export async function GET(request: any) {
  const session = await auth();

  console.log('SESIÓN', session);

  return NextResponse.json({ message: session?.user?.id }, { status: 200 });
}
