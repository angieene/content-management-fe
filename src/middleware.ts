import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for access token in cookies or headers
  const accessToken = request.cookies.get('accessToken')?.value;

  // For client-side routing, we'll rely on localStorage check in the component
  // Here we just define the protected routes
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                     request.nextUrl.pathname.startsWith('/register');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  // If trying to access dashboard without token, redirect to login
  if (isDashboard && !accessToken) {
    // We'll handle this in the layout component since tokens are in localStorage
    return NextResponse.next();
  }

  // If logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
