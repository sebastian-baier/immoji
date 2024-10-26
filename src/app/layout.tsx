import dynamic from 'next/dynamic';

import { User } from '@prisma/client';

import { prisma } from '@/lib/database/prisma';

import { validateSession } from '@/actions/auth/validateSession';

import './globals.css';

// Dynamically import the Navbar
const SideNav = dynamic(() => import('@/containers/nav/sidenav'), {
  ssr: false,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateSession();
  let isLoggedIn = false;
  let dbUser: User | null = null;

  if (user) {
    isLoggedIn = true;
    dbUser = await prisma.user.findUnique({
      where: { id: user?.id },
    });
  }

  return (
    <html lang="en">
      <head>
        <title>Baier Finances</title>
        <meta name="description" content="App description" />
      </head>
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
    </html>
  );
}
