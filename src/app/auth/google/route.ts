import { cookies } from 'next/headers';

import { generateCodeVerifier, generateState } from 'arctic';

import { google } from '@/lib/auth/arctic';

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier);

  // Store state in cookies to validate during the callback
  cookies().set('google_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  cookies().set('google_oauth_code_verifier', codeVerifier, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    sameSite: 'lax',
  });

  return Response.redirect(url);
}
