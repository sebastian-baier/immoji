'use server';
import Stepper from '@/containers/property/create-property';
import { CreateTest } from '@/containers/property/create-test';

export default async function Create() {

    return <div className='flex flex-col gap-6 items-start h-full'><Stepper></Stepper></div>;
}
