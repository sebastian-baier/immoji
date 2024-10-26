import { cookies } from 'next/headers';

import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';

import { github } from '@/lib/auth/arctic';
import { lucia } from '@/lib/auth/lucia';
import { prisma } from '@/lib/database/prisma';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);

    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    console.log(githubUser);

    // Try finding a user based on the GitHub ID if it exists
    let existingUser = await prisma.user.findFirst({
      where: {
        githubId: githubUser.id.toString(), // githubId is not unique anymore
      },
    });

    // If no user is found with GitHub ID, check if a user exists with the same username or email
    if (!existingUser) {
      existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { userName: githubUser.login }, // Fallback: look for user by GitHub username
            { email: githubUser.email }, // If the email is available and saved
          ],
        },
      });
    }

    if (existingUser) {
      // User exists, create a new session
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

    // User doesn't exist, create a new one
    const userId = generateIdFromEntropySize(10); // Generate a new unique user ID

    await prisma.user.create({
      data: {
        id: userId,
        githubId: githubUser.id.toString(), // Allow `null` if the GitHub ID is not available
        userName: githubUser.login,
        email: githubUser.email, // Store the email if available
        picture: githubUser.avatar_url,
        role: 'USER',
      },
    });

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
    console.log(e);

    if (e instanceof OAuth2RequestError) {
      // Handle OAuth2 request errors
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  email?: string; // GitHub user may or may not have an email
  avatar_url?: string;
}
