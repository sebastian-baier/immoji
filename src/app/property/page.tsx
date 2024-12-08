'use server'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PropertyTypes } from '@prisma/client'
import { CreatePropertyButton } from '@/components/create-property-button'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import { getCurrentSession } from '@/lib/auth/session'
import { getPropertiesOfOwner } from '@/actions/property/get-properties'
import { PropertyCard } from '@/containers/property/property-card'
import { PropertyWithDetails } from '@/types/property'

export default async function PropertyPage() {
	const { user } = await getCurrentSession()

	if (!user) {
		return redirect('/auth')
	}

	const properties: PropertyWithDetails[] =
		await getPropertiesOfOwner(user.id)

	return (
		<div className='flex flex-col items-start gap-12'>
			<h2 className='text-xl font-semibold'>Immobilien</h2>

			{/* todo add filter */}
			<div className='grid grid-cols-2 items-center justify-center gap-4'>
				{properties.map((property) => (
					<PropertyCard
						key={property.id}
						property={{
							...property,
							additionalCosts: +property.additionalCosts,
							rentValue: +property.rentValue,
						}}
					/>
				))}
				<div className='flex items-center justify-center'>
					<Button
						variant={'icon'}
						size='icon'
						className='rounded-full p-2'
						aria-label='add-property'
						asChild
					>
						<Link href={'/property/create'}>
							<Icons.plus size={2.5} />
						</Link>
					</Button>
				</div>
			</div>
			<div className='flex flex-row gap-4'>
				<CreatePropertyButton
					data={{
						objectNumber: '253',
						street: 'Göthering',
						locality: 'Nürnberg',
						zipCode: 90451,
						houseNumber: '10c',
						Type: PropertyTypes.APARTMENT,
						rentValue: 1000,
						additionalCosts: 150,
						purchasePrice: 200000,
						currentRenterId: null,
						area: 85.5,
						constructionYear: 1995,
						roomCount: 3,
						parentId: null,
						features: [{ name: 'Balcony' }, { name: 'Garage' }],
						propertyManagementId: null,
					}}
				>
					Erstelle Immo mit alle Werten
				</CreatePropertyButton>
				<CreatePropertyButton
					data={{
						objectNumber: null,
						street: 'Göthering',
						locality: 'Stein',
						zipCode: 90422,
						houseNumber: '20b',
						Type: PropertyTypes.HOUSE,
						rentValue: 1000,
						additionalCosts: 150,
						purchasePrice: null,
						currentRenterId: null,
						area: null,
						constructionYear: null,
						roomCount: null,
						parentId: null,
						features: [],
						propertyManagementId: null,
					}}
				>
					Erstelle Immo ohne optionalen Werten
				</CreatePropertyButton>
			</div>
		</div>
	)
}
