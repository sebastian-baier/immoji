import { PropertyTypes } from '@prisma/client'
import { z } from 'zod'

export const propertySchema = z.object({
	objectNumber: z
		.string()
		.nullable()
		.refine((val) => val === null || val.length > 0, {
			message: 'Die Objektnummer ist erforderlich.',
		}),

	street: z.string().min(1, 'Die Straße ist erforderlich'),
	locality: z.string().min(1, 'Die Stadt ist erforderlich'),

	zipCode: z
		.number()
		.refine((val) => /^\d{5}$/.test(val.toString()), {
			message: 'Postleitzahl muss genau 5-stellig sein',
		}),

	houseNumber: z
		.string()
		.min(1, 'Die Hausnummer ist erforderlich')
		.regex(/^\d{1,4}[a-z]?$|^\d{1,4}$/, {
			message:
				'Die Hausnummer muss aus 1-4 Ziffern bestehen und kann optional mit einem kleinen Buchstaben enden.',
		}),

	Type: z.enum([
		PropertyTypes.APARTMENT,
		PropertyTypes.HOUSE,
		PropertyTypes.GARAGE,
		PropertyTypes.COMPLEX,
	]),

	rentValue: z.number().nonnegative().nullable().default(0),
	additionalCosts: z.number().nonnegative().nullable().default(0),
	purchasePrice: z.number().nonnegative().nullable(),

	currentRenterId: z.string().uuid().nullable().optional(),

	area: z.number().nonnegative().nullable(),

	constructionYear: z
		.number()
		.int()
		.nullable()
		.refine((val) => val === null || val >= 1900, {
			message: 'Das Baujahr muss größer als 1900 sein oder leer sein',
		}),

	roomCount: z.number().int().nonnegative().nullable(),

	parentId: z.string().uuid().nullable().optional(),

	Features: z
		.array(
			z.object({
				name: z
					.string()
					.min(1, 'Der Name der Ausstattung ist erforderlich'),
			}),
		)
		.optional()
		.default([]),
})

// examples
export const basicPropertyInfo = propertySchema.pick({
	objectNumber: true,
	street: true,
	zipCode: true,
	houseNumber: true,
	Type: true,
})

export const financialInfo = propertySchema.pick({
	rentValue: true,
	additionalCosts: true,
	purchasePrice: true,
})

export const physicalInfo = propertySchema.pick({
	area: true,
	constructionYear: true,
	roomCount: true,
})

export const relationshipInfo = propertySchema.pick({
	currentRenterId: true,
	parentId: true,
})

export const featuresInfo = propertySchema.pick({
	Features: true,
})

export type PropertyFormValues = z.infer<typeof propertySchema>
