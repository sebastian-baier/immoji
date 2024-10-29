'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentSession } from '@/lib/auth/session';
import { prisma } from '@/lib/database/prisma';
import { propertySchema } from '@/lib/zod/property';

import { PropertyWithNumbers } from '@/types/property';

export async function createProperty(data: PropertyWithNumbers) {
  try {
    const validatedData = propertySchema.parse(data);

    const { user } = await getCurrentSession();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const existingProperty = await prisma.property.findFirst({
      where: {
        objectNumber: validatedData.objectNumber,
        address: validatedData.address,
        zipCode: +validatedData.zipCode,
        houseNumber: validatedData.houseNumber,
        type: validatedData.type,
      },
    });

    if (existingProperty) {
      throw new Error('Eine Immobilie mit diesen Daten existiert bereits.');
    }

    const property = await prisma.property.create({
      data: {
        objectNumber: validatedData.objectNumber,
        address: validatedData.address,
        zipCode: +validatedData.zipCode,
        houseNumber: validatedData.houseNumber,
        type: validatedData.type,
        rentValue: validatedData.rentValue?.toString(),
        additionalCosts: validatedData.additionalCosts?.toString(),
        purchasePrice: validatedData.purchasePrice,
        currentRenterId: validatedData.currentRenterId,
        userId: user.id,
        area: validatedData.area,
        constructionYear: validatedData.constructionYear,
        roomCount: validatedData.roomCount,
        parentId: validatedData.parentId,
        features: {
          connectOrCreate: validatedData.features?.map((feature) => ({
            where: { name: feature.name },
            create: { name: feature.name },
          })),
        },
      },
      include: {
        features: true,
      },
    });

    // Zahlenfelder in Number konvertieren, falls nötig
    return {
      ...property,
      rentValue: +property.rentValue,
      additionalCosts: +property.additionalCosts,
      purchasePrice: property.purchasePrice ? +property.purchasePrice : 0.0,
    };
  } catch (error: any) {
    console.error('Error creating property: ', error.message);
    throw error;
  } finally {
    revalidatePath('/property');
  }
}
