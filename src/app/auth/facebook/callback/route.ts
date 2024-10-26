import { cookies } from 'next/headers';

import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';

import { facebook } from '@/lib/auth/arctic';
import { lucia } from '@/lib/auth/lucia';
import { prisma } from '@/lib/database/prisma';

// Import your Facebook instance

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = (await cookies()).get('facebook_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    // Validate Facebook authorization code
    const tokens = await facebook.validateAuthorizationCode(code);

    // Fetch user data from Facebook's API
    const facebookUserResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokens.accessToken}`,
    );

    const facebookUser: FacebookUser = await facebookUserResponse.json();

    // Try to find a user by Facebook ID first
    let existingUser = await prisma.user.findFirst({
      where: {
        facebookId: facebookUser.id,
      },
    });

    if (existingUser) {
      // Create a session and set the session cookie
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      return new Response(null, {
        status: 302,
        headers: { Location: '/' },
      });
    }

    // No existing user found, create a new user
    const userId = generateIdFromEntropySize(10); // Generate unique user ID

    await prisma.user.create({
      data: {
        id: userId,
        facebookId: facebookUser.id,
        userName: facebookUser.name,
        email: facebookUser.email,
        picture: facebookUser.picture?.data.url || '', // Handle missing picture
        role: 'USER',
      },
    });

    // Create a session and set the session cookie
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
      status: 302,
      headers: { Location: '/' },
    });
  } catch (e) {
    console.log(e);

    if (e instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }

    return new Response(null, { status: 500 });
  }
}

interface FacebookUser {
  id: string;
  name?: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}
