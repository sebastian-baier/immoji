'use server';

import { PropertyWithDetails } from '@/types/property';

import { prisma } from '../../lib/database/prisma';

export const getPropertiesOfOwner = async (userId: string): Promise<PropertyWithDetails[]> => {
  const properties = await prisma.property.findMany({
    where: { userId },
    include: {
      currentRenter: true, // Include current renter details
      renterHistory: {
        orderBy: {
          startDate: 'desc', // Optionally order by the latest rent start date
        },
      },
    },
  });

  return properties.map((property) => {
    return {
      userId: property.userId, // Benutzer-ID
      id: property.id, // Immobilien-ID
      objectNumber: property.objectNumber, // Objektnummer
      address: property.address, // Adresse
      zipCode: property.zipCode,
      houseNumber: property.houseNumber, // Hausnummer
      type: property.type, // Immobilientyp
      rentValue: property.rentValue.toNumber(), // Kaltmiete (Decimal in Zahl umwandeln)
      additionalCosts: property.additionalCosts.toNumber(), // Nebenkosten (Decimal in Zahl umwandeln)
      rentStatus: !property.currentRenterId ? 'RENTED' : 'NOT_RENTED', // Mietstatus
      propertyType: property.type, // Immobilientyp
      area: property.area, // Fläche (optional)
      roomCount: property.roomCount, // Zimmeranzahl (optional)
      tenant: property.currentRenter, // Name des Mieters
      purchasePrice: property.purchasePrice && property.purchasePrice.toNumber(),
      yield:
        property.purchasePrice &&
        +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
    };
  });
};
