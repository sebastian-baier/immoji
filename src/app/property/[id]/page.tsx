'use server';
import { validateSession } from '@/actions/auth/validateSession';
import { redirect } from 'next/navigation';

export default async function Property({ params }: { params: { id: string } }) {
	const { user } = await validateSession();

	if (!user) {
		return redirect('/auth');
	}

	return <div className='flex flex-col gap-6 items-start'>{params.id}</div>;
}
