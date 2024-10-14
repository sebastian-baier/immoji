import dynamic from 'next/dynamic';
import './globals.css';
import { prisma } from '@/lib/database/prisma';
import { User } from '@prisma/client';
import { validateSession } from '@/actions/auth/validateSession';

// Dynamically import the Navbar
const SideNav = dynamic(() => import('@/containers/nav/sidenav'), {
	ssr: false
});

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const { user } = await validateSession();
	let isLoggedIn = false;
	let dbUser: User | null = null;

	if (user) {
		isLoggedIn = true;
		dbUser = await prisma.user.findUnique({
			where: { id: user?.id }
		});
	}

	return (
		<html lang='en'>
			<head>
				<title>Baier Finances</title>
				<meta name='description' content='App description' />
			</head>
			<body
				className={`antialiased h-screen w-full flex flex-col bg-black bg-dot-purple-100/[0.2] overflow-hidden`}
			>
				<div className='h-full w-full flex flex-col md:flex-row py-8 px-4 gap-4 z-10'>
					<SideNav isLoggedIn={isLoggedIn} user={dbUser} />
					<main
						id='main-content'
						className='w-full bg-white dark:bg-neutral-900 rounded-3xl p-12 overflow-y-auto scrollbar-none'
					>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
