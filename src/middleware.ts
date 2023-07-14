'use client';

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('jwt');
  const jwt = cookie?.value as string;
  const response = NextResponse.next();
  console.log('whole cookie', cookie);
  console.log('jwt value', jwt);
  if (!jwt) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth`
      );
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(jwt, secret, {
      issuer: 'trying',
      audience: 'audience',
    });
    response.cookies.set('userId', payload.userId as string);

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
  } catch (error) {
    return new Response(
      'Something went wrong. Please clear your cookies and try again.',
      { status: 500 }
    );
  }
  return response;
}

export const config = {
  matcher: ['/', '/dashboard', '/auth'],
};
