'use client';

import React from 'react';

import { PinContainer } from '@/components/ui/3d-pin';

export function AnimatedPinDemo() {
  return (
    <PinContainer title="/immoji" href="/dashboard">
      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">Immoji</h3>
        <div className="text-base !m-0 !p-0 font-normal">
          <span className="text-slate-500 ">
            Bester Immobilien Manager auf der Welt! 12 von 10 Sternen auf Steam :o Ist es überhaupt
            möglich so krass zu sein?
          </span>
        </div>
        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
      </div>
    </PinContainer>
  );
}
