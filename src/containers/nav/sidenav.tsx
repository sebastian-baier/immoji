'use client';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import NavItem from './nav-item';
import { User } from '@prisma/client';
import { Spinner } from '@/components/spinner';
import { logout } from '@/actions/auth/logout';
import { useRouter } from 'next/navigation';

const navigations = [
	{ name: 'Dashboard', href: '/dashboard', icon: Icons.dashboard },
	{ name: 'Transaktionen', href: '/transaction', icon: Icons.arrowLeftRight },
	{ name: 'Immobilien', href: '/property', icon: Icons.home }
];

export default function SideNav({
	isLoggedIn,
	user
}: {
	isLoggedIn: boolean;
	user: User | null;
}) {
	const router = useRouter();
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		try {
			setIsLoading(true); // Start loading state
			await logout(); // Call your logout function
		} catch (error) {
			console.error('Logout failed', error);
		} finally {
			setIsLoading(false); // End loading state
		}
	};

	return (
		<>
			{/* Mobile Menu Toggle */}
			<button
				className='md:hidden p-4 text-white'
				onClick={() => setSidebarOpen(!isSidebarOpen)}
				aria-label={
					isSidebarOpen ? 'Close navigation' : 'Open navigation'
				}
			>
				<Icons.menu />
			</button>

			{/* Sidebar Component */}
			<aside
				role='navigation'
				aria-label='Main Navigation'
				className={`fixed md:static top-0 left-0 w-64 h-full ${
					isSidebarOpen ? 'p-6' : 'px-6'
				} transition-transform z-20 ${
					isSidebarOpen ? 'bg-black' : 'bg-transparent'
				}
        ${
			isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
		} md:translate-x-0 flex flex-col justify-between`}
			>
				<div className='flex flex-col gap-12'>
					{/* Logo */}
					<Image
						src='baier.svg'
						alt='Company Logo'
						width={180}
						height={64}
						className='fill-white cursor-pointer'
						onClick={() => router.push('/')}
					/>

					{/* Navigation Links */}
					<nav className='flex flex-col gap-6'>
						{navigations.map((navElement) => (
							<NavItem
								key={navElement.href}
								href={navElement.href}
								icon={navElement.icon}
								label={navElement.name}
							/>
						))}
					</nav>
				</div>

				{/* User Profile / Login Section */}
				{isLoggedIn ? (
					<div className='flex flex-row justify-between items-center'>
						<div className='flex flex-row gap-3 items-center cursor-pointer'>
							<Image
								// className='rounded-3xl border-gray-500 border-2 w-13 h-13'
								className='rounded-3xl border-purple-900 border-2 w-13 h-13'
								src={user?.picture ? user.picture : ''}
								alt={''}
								width={48}
								height={48}
							/>
							<p className='text-white font-medium text-lg'>
								{user?.userName}
							</p>
						</div>
						<Button
							variant={'ghostIcon'}
							size={'icon'}
							aria-label='Logout'
							onClick={handleLogout}
							disabled={isLoading}
						>
							{isLoading ? (
								<Spinner
									size='md'
									className='border-t-gray-600'
								/>
							) : (
								<Icons.logout className='text-white hover:text-gray-500' />
							)}
						</Button>
					</div>
				) : (
					<Button
						variant={'icon'}
						className='flex gap-2'
						aria-label='Login'
						asChild
					>
						<Link href='/auth' className='flex items-center gap-2'>
							<span>Login</span>
							<Icons.login className='text-white hover:text-gray-500' />
						</Link>
					</Button>
				)}
			</aside>

			{/* Overlay for mobile menu */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden'
					onClick={() => setSidebarOpen(false)}
					aria-hidden='true'
				></div>
			)}
		</>
	);
}
