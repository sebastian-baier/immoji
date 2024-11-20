'use server'

import { notFound } from 'next/navigation'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { getPropertyById } from '@/actions/property/get-properties'
import { Banner } from '@/containers/property/banner'
import { LastRentAdjustmentCard } from '@/containers/property/last-rent-adjustment-card'
import { LoansCard } from '@/containers/property/loans-card'
import { RentPaidOverview } from '@/containers/property/rent-paid-overview'
import { RenterCard } from '@/containers/property/renter-card'
import { RentStatus } from '@/types/property'

export default async function Property(props: {
	params: Promise<{ id: string }>
}) {
	const property = await getPropertyById((await props.params).id)

	if (!property) notFound()

	const status = !property.currentRenter
		? RentStatus.NOT_RENTED
		: !property.currentRenter.endRentDate
			? RentStatus.TERMINATED
			: RentStatus.RENTED

	function PropertyDetail({
		label,
		labelClassName,
		value,
		valueClassName,
		containerClassName,
	}: {
		label: string
		labelClassName?: string
		value: string
		valueClassName?: string
		containerClassName?: string
	}) {
		// TODO pass style to make more customizable
		return (
			<Card
				className={cn(
					'flex flex-col items-center gap-2 p-4',
					containerClassName,
				)}
			>
				<Label
					className={cn('text-md text-gray-600', labelClassName)}
				>
					{label}
				</Label>
				<p className={cn('text-xl font-semibold', valueClassName)}>
					{value}
				</p>
			</Card>
		)
	}

	function RentStatusBadge({
		rentStatus,
	}: {
		rentStatus: RentStatus
	}) {
		switch (rentStatus) {
			case RentStatus.NOT_RENTED:
				return (
					<Badge className='bg-red-600 text-lg'>
						Nicht vermietet
					</Badge>
				)
			case RentStatus.RENTED:
				return (
					<Badge className='bg-green-600 text-lg'>Vermietet</Badge>
				)
			case RentStatus.TERMINATED:
				return (
					<Badge className='bg-yellow-600 text-lg'>Gekündigt</Badge>
				)
		}
	}

	return (
		<div className='-m-12 flex flex-col items-start gap-12'>
			<Banner property={property} />

			<div className='flex w-full flex-row items-start gap-12 px-12'>
				<div className='grid grid-cols-3 gap-4'>
					<PropertyDetail
						containerClassName='col-span-3'
						label='Kaufpreis'
						value={
							!property.purchasePrice
								? ''
								: `${property.purchasePrice.toString()} €`
						}
					/>
					<PropertyDetail
						label='Kaltmiete'
						value={
							!property.rentValue
								? ''
								: `${property.rentValue.toString()} €`
						}
						containerClassName='col-span-1'
					/>
					<PropertyDetail
						label='Nebenkosten'
						value={
							!property.additionalCosts
								? ''
								: `${property.additionalCosts.toString()} €`
						}
					/>
					<PropertyDetail
						label='Wohnfläche'
						value={
							!property.area ? '' : `${property.area.toString()} m²`
						}
					/>
					<PropertyDetail
						label='Zimmer Anzahl'
						value={
							!property.roomCount
								? ''
								: `${property.roomCount.toString()}`
						}
					/>
					<PropertyDetail
						label='Baujahr'
						value={
							!property.constructionYear
								? ''
								: `${property.constructionYear.toString()}`
						}
					/>
				</div>

				<LastRentAdjustmentCard
					rentAdjustmentHistory={property.rentAdjustmentHistory}
				/>
				<LoansCard loans={property.loans} />
				<RenterCard currentRenter={property.currentRenter} />
				<RentStatusBadge rentStatus={status} />
			</div>
			<div className='flex w-full items-center justify-center'>
				<RentPaidOverview />
			</div>
		</div>
	)
}
