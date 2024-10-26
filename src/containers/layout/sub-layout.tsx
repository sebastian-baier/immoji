import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/lib/auth/session';

export default async function SubLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect('/auth');
  }
  return <>{children}</>;
}
