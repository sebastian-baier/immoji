'use server';

import { redirect } from 'next/navigation';

import { validateSession } from '@/actions/auth/validateSession';

export default async function Property({ params }: { params: { id: string } }) {
  const { user } = await validateSession();

  if (!user) {
    return redirect('/auth');
  }

  return <div className="flex flex-col items-start gap-6">{params.id}</div>;
}
