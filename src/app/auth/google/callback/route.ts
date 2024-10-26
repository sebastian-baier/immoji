import { cookies } from 'next/headers';

import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';

import { google } from '@/lib/auth/arctic';
import { lucia } from '@/lib/auth/lucia';
import { prisma } from '@/lib/database/prisma';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedCodeVerifier = cookies().get('google_oauth_code_verifier')?.value ?? null;
  const storedState = cookies().get('google_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
    const googleUserResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const googleUser: GoogleUser = await googleUserResponse.json();
    // console.log(googleUser);

    // Try to find a user by Google ID first
    let existingUser = await prisma.user.findFirst({
      where: {
        googleId: googleUser.sub, // "sub" is Google's unique user ID
      },
    });

    if (existingUser) {
      // Create a session and set the session cookie
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    // No existing user found, create a new user
    const userId = generateIdFromEntropySize(10); // Generate unique user ID

    await prisma.user.create({
      data: {
        id: userId,
        googleId: googleUser.sub, // googleId can be null if not provided
        userName: googleUser.name,
        email: googleUser.email, // Save the email if available
        picture: googleUser.picture,
        role: 'USER',
      },
    });

    // Create a session and set the session cookie
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    // Handle OAuth error
    console.log(e);

    if (e instanceof OAuth2RequestError) {
      // Invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}
