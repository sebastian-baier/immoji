import { Renter } from '@prisma/client'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function RenterCard({
	currentRenter,
}: {
	currentRenter: Renter | null
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-md font-semibold text-gray-600'>
					Mieter
				</CardTitle>
			</CardHeader>
			<CardContent>
				{currentRenter?.id ? (
					<>
						<p className='text-sm font-semibold'>
							{currentRenter?.firstName}
						</p>
						<p className='text-sm font-semibold'>
							{currentRenter?.lastName}
						</p>
						<p className='text-sm font-semibold'>
							{currentRenter?.email}
						</p>
						<p className='text-sm font-semibold'>
							{currentRenter?.phoneNumber}
						</p>
						{/* TODO change to local string and check which time is inputed in server (always
        convert to utc) */}
						<p className='text-sm font-semibold'>
							{currentRenter?.startRentDate.toString()}
						</p>
						<p className='text-sm font-semibold'>
							{currentRenter?.endRentDate?.toString()}
						</p>
					</>
				) : (
					<div className='flex flex-col items-center gap-4 px-8'>
						<p>kein Mieter vorhanden</p>
						<Button>
							<Icons.plus />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
