import { defineMiddleware } from 'astro:middleware';

const PUBLIC_PATHS = ['/login', '/api/login', '/api/logout'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Allow public paths through
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return next();
  }

  // Check for auth cookie
  const auth = context.cookies.get('glitch_auth');
  if (auth?.value === 'true') {
    return next();
  }

  // Not authenticated — redirect to login
  return context.redirect('/login');
});
