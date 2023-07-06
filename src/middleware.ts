import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('jwt');
  console.log(cookie?.value);
  console.log(cookie);

  if (req.nextUrl.pathname.startsWith('/dashboard') && !cookie) {
    return NextResponse.redirect('http://localhost:3000/auth');
  }

  if (req.nextUrl.pathname.startsWith('/auth') && cookie) {
    return NextResponse.redirect('http://localhost:3000/dashboard');
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/auth'],
};
