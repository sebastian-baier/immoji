'use server';

import Head from 'next/head';
import { redirect } from 'next/navigation';

import { User } from '@prisma/client';

import { getCurrentSession } from '@/lib/auth/session';
import { prisma } from '@/lib/database/prisma';

import SideNav from '../nav/sidenav';

export default async function ToolLayout({ children }: { children: React.ReactNode }) {
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
    <body
      className={`flex h-screen w-full flex-col overflow-hidden bg-black antialiased bg-dot-purple-100/[0.2]`}
    >
      <div className="z-10 flex h-full w-full flex-col gap-4 px-4 py-8 md:flex-row">
        <SideNav isLoggedIn={isLoggedIn} user={dbUser} />
        <main
          id="main-content"
          className="w-full overflow-y-auto rounded-3xl bg-white p-12 scrollbar-none dark:bg-neutral-900"
        >
          {children}
        </main>
      </div>
    </body>
  );
}
