'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/database/prisma';

export async function createProperty(data: {
  userId: string; // ID of the logged-in user
  objectNumber: string;
  address: string;
  zipCode: string;
  houseNumber: string;
  type: 'APARTMENT' | 'HOUSE' | 'GARAGE'; // Adjust according to your PropertyTypes enum
  rentValue: number;
  additionalCosts: number;
}) {
  try {
    const existingProperty = await prisma.property.findFirst({
      where: {
        objectNumber: data.objectNumber,
        address: data.address,
        zipCode: parseInt(data.zipCode),
        houseNumber: data.houseNumber,
        type: data.type,
      },
    });

    if (existingProperty) {
      throw new Error('Eine Immobilie mit diesen Daten existiert bereits.');
    }

    const property = await prisma.property.create({
      data: {
        objectNumber: data.objectNumber,
        address: data.address,
        zipCode: parseInt(data.zipCode),
        houseNumber: data.houseNumber,
        type: data.type,
        rentValue: data.rentValue,
        additionalCosts: data.additionalCosts,
        userId: data.userId, // Associate property with the logged-in user
      },
    });

    return {
      ...property,
      rentValue: +property.rentValue,
      additionalCosts: +property.additionalCosts,
    };
  } catch (error: any) {
    console.error('Error creating property: ', error.message);
    throw error;
  } finally {
    revalidatePath('/property');
  }
}
