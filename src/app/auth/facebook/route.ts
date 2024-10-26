// app/login/github/route.ts
import { cookies } from 'next/headers';

import { generateState } from 'arctic';

import { facebook } from '@/lib/auth/arctic';

export async function GET(): Promise<Response> {
  const state = generateState();

  const scopes = ['email', 'public_profile'];
  const url: URL = await facebook.createAuthorizationURL(state, {
    scopes,
  });

  (await cookies()).set('facebook_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });
  return Response.redirect(url);
}
