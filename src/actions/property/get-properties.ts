'use server';

import { PropertyWithDetails } from '@/types/property';

import { prisma } from '../../lib/database/prisma';

export const getPropertiesOfOwner = async (userId: string): Promise<PropertyWithDetails[]> => {
  //TODO add owner auth

  const properties = await prisma.property.findMany({
    where: { userId },
    include: {
      currentRenter: true,
      renterHistory: {
        orderBy: {
          startDate: 'desc',
        },
      },
    },
  });

  return properties.map((property) => {
    return {
      userId: property.userId,
      id: property.id,
      objectNumber: property.objectNumber,
      address: property.address,
      zipCode: property.zipCode,
      houseNumber: property.houseNumber,
      type: property.type,
      rentValue: property.rentValue.toNumber(),
      additionalCosts: property.additionalCosts.toNumber(),
      rentStatus: !property.currentRenterId ? 'RENTED' : 'NOT_RENTED',
      area: property.area,
      roomCount: property.roomCount,
      tenant: property.currentRenter,
      purchasePrice: property.purchasePrice && property.purchasePrice.toNumber(),
      yield:
        property.purchasePrice &&
        +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
    };
  });
};

export const getPropertyById = async (id: string): Promise<PropertyWithDetails | null> => {
  //TODO add owner auth

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      currentRenter: true,
      renterHistory: {
        orderBy: {
          startDate: 'desc',
        },
      },
    },
  });

  if (!property) return null;

  return {
    userId: property.userId,
    id: property.id,
    objectNumber: property.objectNumber,
    address: property.address,
    zipCode: property.zipCode,
    houseNumber: property.houseNumber,
    type: property.type,
    rentValue: property.rentValue.toNumber(),
    additionalCosts: property.additionalCosts.toNumber(),
    rentStatus: !property.currentRenterId ? 'RENTED' : 'NOT_RENTED',
    area: property.area,
    roomCount: property.roomCount,
    tenant: property.currentRenter,
    purchasePrice: property.purchasePrice && property.purchasePrice.toNumber(),
    yield:
      property.purchasePrice &&
      +(((+property.rentValue * 12) / property.purchasePrice.toNumber()) * 100).toFixed(2),
  };
};
