import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Check if current path is a login path (e.g. /login, /en/login, /ar/login)
  const isLoginPage = /^\/(en|ar)\/login\/?$|^\/login\/?$/.test(pathname);

  // If authenticated and trying to access login, redirect to home
  if (token && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // If not authenticated and not on login page, redirect to login
  const isApiRoute = pathname.startsWith('/api');
  if (!token && !isLoginPage && !isApiRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Let next-intl handle localization routing
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - all files with an extension (e.g. favicon.ico, .svg, .png)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
