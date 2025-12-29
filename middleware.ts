import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicPaths = ['/login', '/signup', '/api/auth/login', '/api/auth/signup'];

  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname === path ||
    request.nextUrl.pathname.startsWith(path + '/')
  );

  // Check for auth token in cookies
  const token = request.cookies.get('auth_token')?.value;
  const user = token ? verifyToken(token) : null;

  // If user is trying to access a protected route without being authenticated
  if (!isPublicPath && !user) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and trying to access login/signup, redirect to dashboard
  if (isPublicPath && user &&
      (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};