import { Loan } from '@prisma/client'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function LoansCard({ loans }: { loans: Loan[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-md font-semibold text-gray-600'>
					Darlehen
				</CardTitle>
			</CardHeader>
			<CardContent>
				{loans?.length > 0 ? (
					<>
						<p>{loans[0].lender}</p>
					</>
				) : (
					<div className='flex flex-col items-center gap-4 px-8'>
						<p>kein Darlehen vorhanden</p>
						<Button>
							<Icons.plus />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
