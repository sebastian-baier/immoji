'use server'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/custom-ui/button'
import { SparklesCore } from '@/components/ui/sparkles'
import { AnimatedPinDemo } from '@/containers/animated-pin-demo'
import LandingLayout from '@/containers/layout/landing-layout'

export default async function Page() {
	return (
		<LandingLayout>
			<div className='flex flex-col items-center justify-center gap-16'>
				<div className='flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent'>
					<h1 className='relative z-20 text-center text-3xl font-bold text-white md:text-7xl lg:text-9xl'>
						Immoji
					</h1>
					<div className='relative h-40 w-[40rem]'>
						{/* Gradients */}
						<div className='absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm' />
						<div className='absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
						<div className='absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm' />
						<div className='absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent' />
						{/* Core component */}
						<SparklesCore
							background='transparent'
							minSize={0.4}
							maxSize={1}
							particleDensity={1200}
							className='h-full w-full'
							particleColor='#FFFFFF'
						/>
						{/* Radial Gradient to prevent sharp edges */}
						<div className='absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]'></div>
					</div>
				</div>
				{/* <AnimatedPinDemo /> */}
				<Button asChild>
					<Link href={'/dashboard'}>Get Started</Link>
				</Button>
			</div>
		</LandingLayout>
	)
}
