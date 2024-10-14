'use server';
import { validateSession } from '@/actions/auth/validateSession';
import { Button } from '@/components/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RealEstate() {
	const { user } = await validateSession();

	if (user) {
		return redirect('/');
	}

	return (
		<div className='flex flex-col items-center gap-4'>
			<div className='flex flex-col gap-6 '>
				<h1 className='text-3xl font-semibold text-center'>
					User Login
				</h1>
				<h2 className='text-md font-medium text-center'>
					Login with one of these social accounts...
				</h2>
			</div>
			<div className='w-96 flex flex-col gap-2'>
				<Button asChild className='bg-black flex justify-start'>
					<Link href='/auth/github' className='flex flex-row gap-2'>
						<Icons.github />
						<span>Github</span>
					</Link>
				</Button>
				<Button asChild className='bg-red-600 flex justify-start'>
					<Link href='/auth/google' className='flex flex-row gap-2'>
						<Icons.google />
						<span>Google</span>
					</Link>
				</Button>
				{/* <Button asChild className='bg-blue-700 flex justify-start'>
					<Link href='/auth/facebook' className='flex flex-row gap-2'>
						<Icons.facebook />
						<span>Facebook</span>
					</Link>
				</Button>
				<Button asChild className='bg-zinc-400 flex justify-start'>
					<Link href='/auth/apple' className='flex flex-row gap-2'>
						<Icons.apple />
						<span>Apple</span>
					</Link>
				</Button> */}
			</div>
			{/* <p className='text-md font-medium text-center'>or</p> */}
		</div>
	);
}
