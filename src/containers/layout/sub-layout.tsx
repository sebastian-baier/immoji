import { validateSession } from '@/actions/auth/validateSession';
import { redirect } from 'next/navigation';

export default async function SubLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const { user } = await validateSession();

	if (!user) {
		return redirect('/auth');
	}
	return <>{children}</>;
}
