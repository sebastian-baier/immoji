import { PropertyTypes } from '@prisma/client';
import { z } from 'zod';

export const propertySchema = z.object({
  objectNumber: z
    .string()
    .nullable()
    .refine((val) => val === null || val.length > 0, {
      message: 'Die Objektnummer ist erforderlich, wenn angegeben.',
    })
    .refine(
      (val) => {
        // Check if the value is not null or undefined before applying regex
        if (val === null) return true;
        return /^\d{1,4}[a-z]?$|^\d{1,4}$/.test(val);
      },
      {
        message:
          'Die Objektnummer muss aus 1-4 Ziffern bestehen und kann optional mit einem kleinen Buchstaben enden.',
      },
    )
    .transform((val) => (val === '' ? null : val)),

  address: z.string().min(1, 'Die Adresse ist erforderlich'),

  zipCode: z.number().int().min(10000).max(99999, 'Postleitzahl muss genau 5-stellig sein'),

  houseNumber: z
    .string()
    .min(1, 'Die Hausnummer ist erforderlich')
    .regex(/^\d{1,4}[a-z]?$|^\d{1,4}$/, {
      message:
        'Die Hausnummer muss aus 1-4 Ziffern bestehen und kann optional mit einem kleinen Buchstaben enden.',
    }),

  type: z.enum([PropertyTypes.APARTMENT, PropertyTypes.HOUSE, PropertyTypes.GARAGE], {
    required_error: 'Bitte wählen Sie eine Immobilienart aus.',
  }),

  rentValue: z
    .number()
    .nullable()
    .refine((val) => val === null || val > 0, {
      message: 'Der Mietwert muss eine positive Zahl oder null sein',
    }),

  additionalCosts: z
    .number()
    .nullable()
    .refine((val) => val === null || val > 0, {
      message: 'Die Nebenkosten müssen eine positive Zahl oder null sein',
    }),

  purchasePrice: z
    .number()
    .nullable()
    .refine((val) => val === null || val > 0, {
      message: 'Der Kaufpreis muss eine positive Zahl oder null sein',
    }),

  currentRenterId: z.string().nullable().optional(), // Optional, kann null sein

  area: z
    .number()
    .nullable()
    .refine((val) => val === null || val > 0, {
      message: 'Die Fläche muss eine positive Zahl oder null sein',
    }),

  constructionYear: z
    .number()
    .nullable()
    .refine((val) => val === null || (Number.isInteger(val) && val >= 1900), {
      message: 'Das Baujahr muss eine ganze Zahl und größer als 1900 sein oder null sein',
    }),

  roomCount: z
    .number()
    .nullable()
    .refine((val) => val === null || (Number.isInteger(val) && val >= 0), {
      message: 'Die Zimmeranzahl muss eine ganze Zahl und nicht negativ sein oder null sein',
    }),

  parentId: z.string().nullable().optional(), // Optional, kann null sein

  features: z
    .array(
      z.object({
        name: z.string().min(1, 'Der Name der Ausstattung ist erforderlich'),
      }),
    )
    .optional()
    .default([]), // Optional, leeres Array als Default
});
