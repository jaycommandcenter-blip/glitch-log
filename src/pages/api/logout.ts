import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('glitch_auth', { path: '/' });
  return redirect('/login', 302);
};
