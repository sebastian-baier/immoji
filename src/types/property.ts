import {
	Loan,
	Maintenance,
	Property,
	PropertyFeature,
	PropertyTypes,
	RentAdjustmentHistory,
	Renter,
	RenterHistory,
	User,
	File,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

// Stelle sicher, dass die richtigen Imports vorhanden sind

export enum RentStatus {
	NOT_RENTED,
	TERMINATED,
	RENTED,
}

export type PropertyWithDetails = {
	id: string
	objectNumber: string | null
	address: string
	zipCode: number
	houseNumber: string
	type: PropertyTypes
	rentValue: number
	additionalCosts: number
	purchasePrice: number | null
	rentAdjustmentHistory: RentAdjustmentHistory[]
	currentRenter: Renter | null
	loans: Loan[]
	maintenances: Maintenance[]
	files: File[]
	userId: string
	owner: User

	area: number | null
	constructionYear: number | null
	roomCount: number | null
	renterHistory: RenterHistory[]

	features: PropertyFeature[]
	parent: Property | null
	children: Property[]
}

type PropertyWithoutIdAndTimestamps = Omit<
	Property,
	'id' | 'createdAt' | 'updatedAt' | 'userId'
> & {
	features?: Omit<PropertyFeature, 'id'>[]
}

export type PropertyWithNumbers = {
	[K in keyof PropertyWithoutIdAndTimestamps]: PropertyWithoutIdAndTimestamps[K] extends Decimal
		? number
		: PropertyWithoutIdAndTimestamps[K] extends Decimal | null
			? number | null // Wenn es Decimal | null ist, wird es zu number | null
			: PropertyWithoutIdAndTimestamps[K] // Andernfalls bleibt der Typ unverändert
}
