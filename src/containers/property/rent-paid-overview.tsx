import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/custom-ui/button'
import { AnimatedSubscribeButton } from '@/components/ui/animated-subscribe-button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const Months = [
	'Januar',
	'Februar',
	'März',
	'April',
	'Mai',
	'Juni',
	'Juli',
	'August',
	'September',
	'Oktober',
	'November',
	'Dezember',
]

export function RentPaidOverview() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-md font-semibold text-gray-600'>
					Miete 2024
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-row gap-6'>
				{Months.map((month) => (
					<div
						className='flex min-w-28 flex-col items-center justify-center gap-3'
						key={month}
					>
						<label htmlFor=''>{month}</label>
						<AnimatedSubscribeButton
							subscribeStatus={false}
							initialText={
								<span className='group inline-flex items-center'>
									Erhalten{' '}
									<ChevronRightIcon className='ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1' />
								</span>
							}
							changeText={
								<span className='group inline-flex items-center'>
									<CheckIcon className='size-4' />
								</span>
							}
							changeButtonColor={'bg-green-600'}
						/>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
