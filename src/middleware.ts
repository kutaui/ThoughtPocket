import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import BackendURL from '@/utils/BackendURL';
import { getCookie } from 'cookies-next';

export async function middleware(req: NextRequest) {
  const response = await NextResponse.next();
  const cookie = req.cookies.get('userId');

  if (req.nextUrl.pathname.startsWith('/dashboard') && !cookie) {
    // Redirect to login page if the cookie is missing
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`
    );
  }

  if (req.nextUrl.pathname.startsWith('/auth') && cookie) {
    // Redirect to dashboard if the cookie is present
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`
    );
  }

  return response;
}

export const config = {
  matcher: ['/', '/dashboard', '/auth'],
};
