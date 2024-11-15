'use server';

import { redirect } from 'next/navigation';

import { User } from '@prisma/client';

import { getCurrentSession } from '@/lib/auth/session';
import { prisma } from '@/lib/database/prisma';

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentSession();
  let isLoggedIn = false;
  let dbUser: User | null = null;

  if (!user) {
    return redirect('/auth');
  }

  isLoggedIn = true;
  dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  return (
    <body className={`h-screen w-full overflow-hidden bg-black `}>
      <main
        id="main-content"
        className="flex justify-center items-center h-full w-full overflow-y-auto bg-transparent scrollbar-none dark:bg-neutral-900"
      >
        {children}
      </main>
    </body>
  );
}
