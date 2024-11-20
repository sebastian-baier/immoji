import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import { Card } from '@/components/ui/card'
import { PropertyWithDetails } from '@/types/property'

export function Banner({
	property,
}: {
	property: PropertyWithDetails
}) {
	function GetPropertyTypeIcon() {
		switch (property.type) {
			case 'APARTMENT':
				return <Icons.apartment size={3} />
			case 'COMPLEX':
				return <Icons.apartment size={3} />
			case 'HOUSE':
				return <Icons.home size={3} />
			case 'GARAGE':
				return <Icons.garage size={3} />
		}
	}

	return (
		<div className='flex w-full flex-row items-center justify-between rounded-t-3xl bg-gray-300 py-12 pr-6'>
			<Card className='flex flex-row items-center gap-6 rounded-l-none rounded-r-3xl bg-white py-4 pl-11 pr-6'>
				<GetPropertyTypeIcon />
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row gap-3'>
						<div className='flex flex-row gap-1'>
							<p className='text-center text-2xl font-semibold'>
								{property.address}
							</p>
							<p className='text-center text-2xl font-semibold'>
								{property.houseNumber}
							</p>
						</div>
						{/* <p className="text-2xl text-center font-semibold">-</p> */}
						{property.objectNumber && (
							<p className='text-center text-2xl font-semibold'>
								{property.objectNumber}
							</p>
						)}
					</div>
					<div className='flex flex-row gap-4'>
						<p className='text-center text-2xl font-semibold'>
							{property.zipCode}
						</p>
					</div>
				</div>
			</Card>
			<p>TODO here should be a cool image or google maps</p>
			{/* TODO replace with icon of a pen or similar */}
			<Button aria-label='edit page button'>
				<Icons.fileOutlineEdit />
				Bearbeiten
			</Button>
		</div>
	)
}
