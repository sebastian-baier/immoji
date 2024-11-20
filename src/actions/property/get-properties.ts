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
			currentRenter: true,
			loans: {
				orderBy: {
					endDate: 'desc',
				},
			},
			renterHistory: {
				orderBy: {
					endDate: 'desc',
				},
			},
			children: true,
			features: true,
			files: true,
			maintenances: { orderBy: { date: 'desc' } },
			owner: true,
			parent: true,
			rentAdjustmentHistory: { orderBy: { date: 'desc' } },
		},
	})

	return properties.map((property) => {
		return {
			id: property.id,
			objectNumber: property.objectNumber,
			address: property.address,
			zipCode: property.zipCode,
			houseNumber: property.houseNumber,
			type: property.type,
			rentValue: property.rentValue.toNumber(),
			additionalCosts: property.additionalCosts.toNumber(),
			purchasePrice:
				property.purchasePrice && property.purchasePrice.toNumber(),
			rentAdjustmentHistory: property.rentAdjustmentHistory,
			currentRenter: property.currentRenter,
			loans: property.loans,
			maintenances: property.maintenances,
			files: property.files,
			userId: property.userId,
			owner: property.owner,
			area: property.area,
			roomCount: property.roomCount,
			constructionYear: property.constructionYear,
			renterHistory: property.renterHistory,
			features: property.features,
			parent: property.parent,
			children: property.children,

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
			currentRenter: true,
			loans: {
				orderBy: {
					endDate: 'desc',
				},
			},
			renterHistory: {
				orderBy: {
					endDate: 'desc',
				},
			},
			children: true,
			features: true,
			files: true,
			maintenances: { orderBy: { date: 'desc' } },
			owner: true,
			parent: true,
			rentAdjustmentHistory: { orderBy: { date: 'desc' } },
		},
	})

	if (!property) return null

	if (user.id !== property.userId) {
		throw new Error('Not allowed to get property data of this user.')
	}

	return {
		id: property.id,
		objectNumber: property.objectNumber,
		address: property.address,
		zipCode: property.zipCode,
		houseNumber: property.houseNumber,
		type: property.type,
		rentValue: property.rentValue.toNumber(),
		additionalCosts: property.additionalCosts.toNumber(),
		purchasePrice:
			property.purchasePrice && property.purchasePrice.toNumber(),
		rentAdjustmentHistory: property.rentAdjustmentHistory,
		currentRenter: property.currentRenter,
		loans: property.loans,
		maintenances: property.maintenances,
		files: property.files,
		userId: property.userId,
		owner: property.owner,
		area: property.area,
		roomCount: property.roomCount,
		constructionYear: property.constructionYear,
		renterHistory: property.renterHistory,
		features: property.features,
		parent: property.parent,
		children: property.children,
		// yield:
		//   property.purchasePrice &&
		//   +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
	}
}
