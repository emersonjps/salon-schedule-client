import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoute = publicRoutes.find(route => route.path === pathname);
  const authToken = request.cookies.get('authToken');

  if (!publicRoute && !authToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (publicRoute?.whenAuthenticated === 'redirect' && authToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }
}

export const config: MiddlewareConfig = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};