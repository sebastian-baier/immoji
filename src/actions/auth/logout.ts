'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/auth/lucia';

import { validateSession } from './validateSession';

export async function logout(): Promise<ActionResult> {
  const { session } = await validateSession();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/auth');
}

interface ActionResult {
  error: string | null;
}
