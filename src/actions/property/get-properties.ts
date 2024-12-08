'use server'

import { getCurrentSession } from '@/lib/auth/session'
import { PropertyWithDetails } from '@/types/property'
import { prisma } from '../../lib/database/prisma'

export const getPropertiesOfOwner = async (
	userId: string,
): Promise<PropertyWithDetails[]> => {
	const { user } = await getCurrentSession()

	if (!user) {
		throw new Error('User not authenticated')
	}

	if (userId !== user.id) {
		throw new Error('Not allowed to get property data of this user.')
	}

	const properties = await prisma.property.findMany({
		where: { userId },
		include: {
			CurrentRenter: true,
			Loans: {
				orderBy: {
					endDate: 'desc',
				},
			},
			RenterHistory: {
				orderBy: {
					endRentDate: 'desc',
				},
			},
			Children: true,
			Features: true,
			Files: true,
			Maintenances: { orderBy: { date: 'desc' } },
			Owner: true,
			Parent: true,
			RentAdjustmentHistory: { orderBy: { date: 'desc' } },
		},
	})

	return properties.map((property) => {
		return {
			id: property.id,
			objectNumber: property.objectNumber,
			street: property.street,
			locality: property.locality,
			zipCode: property.zipCode,
			houseNumber: property.houseNumber,
			type: property.Type,
			rentValue: property.rentValue.toNumber(),
			additionalCosts: property.additionalCosts.toNumber(),
			purchasePrice:
				property.purchasePrice && property.purchasePrice.toNumber(),
			rentAdjustmentHistory: property.RentAdjustmentHistory,
			currentRenter: property.CurrentRenter,
			loans: property.Loans,
			maintenances: property.Maintenances,
			files: property.Files,
			userId: property.userId,
			owner: property.Owner,
			area: property.area,
			roomCount: property.roomCount,
			constructionYear: property.constructionYear,
			renterHistory: property.RenterHistory,
			features: property.Features,
			parent: property.Parent,
			children: property.Children,

			//   yield:
			//     property.purchasePrice &&
			//     +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
		}
	})
}

export const getPropertyById = async (
	id: string,
): Promise<PropertyWithDetails | null> => {
	const { user } = await getCurrentSession()

	if (!user) {
		throw new Error('User not authenticated')
	}

	const property = await prisma.property.findUnique({
		where: {
			id,
		},
		include: {
			CurrentRenter: true,
			Loans: {
				orderBy: {
					endDate: 'desc',
				},
			},
			RenterHistory: {
				orderBy: {
					endRentDate: 'desc',
				},
			},
			Children: true,
			Features: true,
			Files: true,
			Maintenances: { orderBy: { date: 'desc' } },
			Owner: true,
			Parent: true,
			RentAdjustmentHistory: { orderBy: { date: 'desc' } },
		},
	})

	if (!property) return null

	if (user.id !== property.userId) {
		throw new Error('Not allowed to get property data of this user.')
	}

	return {
		id: property.id,
		objectNumber: property.objectNumber,
		street: property.street,
		locality: property.locality,
		zipCode: property.zipCode,
		houseNumber: property.houseNumber,
		type: property.Type,
		rentValue: property.rentValue.toNumber(),
		additionalCosts: property.additionalCosts.toNumber(),
		purchasePrice:
			property.purchasePrice && property.purchasePrice.toNumber(),
		rentAdjustmentHistory: property.RentAdjustmentHistory,
		currentRenter: property.CurrentRenter,
		loans: property.Loans,
		maintenances: property.Maintenances,
		files: property.Files,
		userId: property.userId,
		owner: property.Owner,
		area: property.area,
		roomCount: property.roomCount,
		constructionYear: property.constructionYear,
		renterHistory: property.RenterHistory,
		features: property.Features,
		parent: property.Parent,
		children: property.Children,
		// yield:
		//   property.purchasePrice &&
		//   +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
	}
}
