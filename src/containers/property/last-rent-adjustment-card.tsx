import { Loan, RentAdjustmentHistory } from '@prisma/client'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function LastRentAdjustmentCard({
	rentAdjustmentHistory,
}: {
	rentAdjustmentHistory: RentAdjustmentHistory[]
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-md font-semibold text-gray-600'>
					Letzte Mieterhöhung
				</CardTitle>
			</CardHeader>
			<CardContent>
				{rentAdjustmentHistory?.length > 0 ? (
					<>
						<p>{rentAdjustmentHistory[0].date.toDateString()}</p>
					</>
				) : (
					<div className='flex flex-col items-center gap-4 px-8'>
						<p>keine Mieterhöhung vorhanden</p>
						<Button>
							<Icons.plus />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
