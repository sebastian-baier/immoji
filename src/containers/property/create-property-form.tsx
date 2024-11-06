'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { PropertyTypes } from '@prisma/client';
import { z } from 'zod';

import { Button } from '@/components/custom-ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createProperty } from '@/actions/property/create-property';

// Define Zod schema for property creation
const schema = z.object({
  objectNumber: z
    .string()
    .min(1, 'Die Objektnummer ist erforderlich')
    .regex(/^\d{1,4}[a-z]?$|^\d{1,4}$/, {
      message:
        'Die Objektnummer muss aus 1-4 Ziffern bestehen und kann optional mit einem kleinen Buchstaben enden.',
    })
    .transform((val) => (val === '' ? null : val)),
  address: z.string().min(1, 'Die Adresse ist erforderlich'),
  zipCode: z
    .string()
    .min(5, 'Die Postleitzahl muss mindestens 5 Ziffern haben')
    .max(5, 'Die Postleitzahl darf maximal 5 Ziffern haben')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Die Postleitzahl muss eine Zahl sein',
    }),
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
});

const CreatePropertyForm = ({ userId }: { userId: string }) => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyTypes | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setValue, // to manually set the value of the select
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await createProperty({
        userId,
        rentValue: 0.0,
        additionalCosts: 0.0,

        ...data,
      });
      setSubmitMessage('Immobilie erfolgreich erstellt!');
      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || 'Fehler beim Erstellen der Immobilie.';
      setSubmitMessage(errorMessage);
      console.error('Create property error:', error);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {submitMessage && <p style={{ color: 'green' }}>{submitMessage}</p>}
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <div className="flex min-h-20 flex-col justify-end gap-1">
          {errors.address && (
            <p className="text-xs text-red-600">
              {typeof errors.address.message === 'string'
                ? errors.address.message
                : 'Ein Fehler ist aufgetreten'}
            </p>
          )}
          <Input type="text" {...register('address')} placeholder="Adresse" />
        </div>
        <div className="flex min-h-20 flex-col justify-end gap-1">
          {errors.zipCode && (
            <p className="text-xs text-red-600">
              {typeof errors.zipCode.message === 'string'
                ? errors.zipCode.message
                : 'Ein Fehler ist aufgetreten'}
            </p>
          )}
          <Input type="text" {...register('zipCode')} placeholder="Postleitzahl" />
        </div>
        <div className="flex min-h-20 flex-col justify-end gap-1">
          {errors.houseNumber && (
            <p className="text-xs text-red-600">
              {typeof errors.houseNumber.message === 'string'
                ? errors.houseNumber.message
                : 'Ein Fehler ist aufgetreten'}
            </p>
          )}
          <Input type="text" {...register('houseNumber')} placeholder="Hausnummer" />
        </div>
        <div className="flex min-h-20 flex-col justify-end gap-1">
          {errors.type && (
            <p className="text-xs text-red-600">
              {typeof errors.type.message === 'string'
                ? errors.type.message
                : 'Ein Fehler ist aufgetreten'}
            </p>
          )}
          <Select
            onValueChange={(value) => {
              setValue('type', value);
              setPropertyType(value as PropertyTypes);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Immobilienart wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PropertyTypes.APARTMENT}>Wohnung</SelectItem>
              <SelectItem value={PropertyTypes.HOUSE}>Haus</SelectItem>
              <SelectItem value={PropertyTypes.GARAGE}>Garage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {propertyType !== PropertyTypes.HOUSE && (
          <div className="flex min-h-20 flex-col justify-end gap-1">
            {errors.objectNumber && (
              <p className="text-xs text-red-600">
                {typeof errors.objectNumber.message === 'string'
                  ? errors.objectNumber.message
                  : 'Ein Fehler ist aufgetreten'}
              </p>
            )}
            <Input
              type="text"
              {...register('objectNumber')}
              placeholder={
                propertyType === PropertyTypes.APARTMENT ? 'Wohnungsnummer' : 'Garagennummer'
              }
            />
          </div>
        )}
      </div>
      <Button className="self-end" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Wird erstellt...' : 'Erstelle Immobilie'}
      </Button>
    </form>
  );
};

export default CreatePropertyForm;
