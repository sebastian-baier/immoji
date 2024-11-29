import { CheckIcon, ChevronRightIcon } from 'lucide-react'
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
				<CardTitle className='text-base font-semibold text-gray-600 sm:text-lg md:text-xl'>
					Miete 2024
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-12 gap-1 sm:gap-2'>
					{Months.map((month) => (
						<div
							className='flex flex-col items-center justify-center'
							key={month}
						>
							<label className='mb-1 text-center font-medium sm:text-xs md:text-sm'>
								{month}
							</label>
							<AnimatedSubscribeButton
								subscribeStatus={false}
								initialText={
									<span className='group inline-flex items-center sm:text-xs md:text-sm'>
										Erhalten{' '}
										<ChevronRightIcon className='ml-0.5 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4' />
									</span>
								}
								changeText={
									<span className='group inline-flex items-center'>
										<CheckIcon className='h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4' />
									</span>
								}
								changeButtonColor={'bg-green-600'}
							/>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
