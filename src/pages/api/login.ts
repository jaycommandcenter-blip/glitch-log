import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const password = form.get('password')?.toString();

  const correctPassword = import.meta.env.BLOG_PASSWORD;

  if (!correctPassword) {
    return new Response('Server misconfigured: BLOG_PASSWORD not set.', { status: 500 });
  }

  if (password === correctPassword) {
    cookies.set('glitch_auth', 'true', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return redirect('/', 302);
  }

  return redirect('/login?error=1', 302);
};
