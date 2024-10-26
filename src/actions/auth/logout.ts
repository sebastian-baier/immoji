'use server';

import { redirect } from 'next/navigation';

import { deleteSessionTokenCookie } from '@/lib/auth/cookies';

import { getCurrentSession, invalidateSession } from '../../lib/auth/session';

export async function logout(): Promise<ActionResult> {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await invalidateSession(session.id);

  await deleteSessionTokenCookie();
  return redirect('/auth');
}

interface ActionResult {
  error: string | null;
}
