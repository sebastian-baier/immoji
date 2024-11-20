'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../custom-ui/button'

interface AnimatedSubscribeButtonProps {
	changeButtonColor: string
	subscribeStatus: boolean
	initialText: React.ReactElement | string
	changeText: React.ReactElement | string
}

export const AnimatedSubscribeButton: React.FC<
	AnimatedSubscribeButtonProps
> = ({
	changeButtonColor,
	subscribeStatus,
	changeText,
	initialText,
}) => {
	const [isSubscribed, setIsSubscribed] =
		useState<boolean>(subscribeStatus)

	return (
		<AnimatePresence mode='wait'>
			{isSubscribed ? (
				<Button asChild className={changeButtonColor}>
					<motion.button
						onClick={() => setIsSubscribed(false)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.span
							key='action'
							className='flex flex-row items-center justify-center'
							initial={{ y: -50 }}
							animate={{ y: 0 }}
						>
							{changeText}
						</motion.span>
					</motion.button>
				</Button>
			) : (
				<Button variant={'ghost'} asChild>
					<motion.button
						onClick={() => setIsSubscribed(true)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.span
							key='reaction'
							className='flex flex-row items-center justify-center'
							initial={{ x: 0 }}
							exit={{ x: 50, transition: { duration: 0.1 } }}
						>
							{initialText}
						</motion.span>
					</motion.button>
				</Button>
			)}
		</AnimatePresence>
	)
}
