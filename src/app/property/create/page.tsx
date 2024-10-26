'use server';
import { validateSession } from '@/actions/auth/validateSession';
import Stepper from '@/containers/property/create-property';
import { redirect } from 'next/navigation';

export default async function CreateProperty({ params }: { params: { id: string } }) {
    const { user } = await validateSession();

    if (!user) {
        return redirect('/auth');
    }

    return <div className='flex flex-col gap-6 items-start'><Stepper></Stepper></div>;
}
