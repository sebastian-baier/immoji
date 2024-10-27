'use server';

import Stepper from '@/containers/property/create-property';

export default async function Create() {
  return (
    <div className="flex flex-col gap-6 items-start h-full">
      <Stepper></Stepper>
    </div>
  );
}
