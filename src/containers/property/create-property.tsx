'use client';

import * as React from 'react';
import { z } from 'zod';

import { defineStepper } from '@stepperize/react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { PropertyTypes } from '@prisma/client';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form"
import { PropertyTypesComponent } from './property-types';

import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/custom-ui/button';


const libraries: Libraries = ['places'] as Libraries;

const propertyTypesSchema = z.object({
    type: z.enum([PropertyTypes.APARTMENT, PropertyTypes.HOUSE, PropertyTypes.GARAGE],)
});

const addressSchema = z.object({
    street: z.string().min(1, 'Die Adresse ist erforderlich'),
    locality: z.string().min(1, 'Die Stadt ist erforderlich'),
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
});

export type PropertyTypesFormValues = z.infer<typeof propertyTypesSchema>;
type AddressFormValues = z.infer<typeof addressSchema>;

const { useStepper, steps } = defineStepper(
    { id: 'type', label: 'Immobilientyp', schema: propertyTypesSchema },
    { id: 'address', label: 'Adresse', schema: addressSchema },
    { id: 'complete', label: 'Complete', schema: z.object({}) }
);

export default function Stepper() {
    const stepper = useStepper();
    const form = useForm({
        mode: 'onTouched',
        resolver: zodResolver(stepper.current.schema),
        defaultValues: {
            type: PropertyTypes.APARTMENT
        }
    });

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (stepper.isLast) {
      stepper.reset();
    } else {
      stepper.next();
    }
  };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-between p-6 border rounded-lg w-[100%] h-full"
            >

                <div className='flex flex-col gap-6'>
                    <div className="flex justify-between">
                        <h2 className="text-lg font-medium">Immobilie erstellen</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Schritt {stepper.current.index + 1} von {steps.length}
                            </span>
                        </div>
                    </div>
                    <nav aria-label="Checkout Steps" className="group ">
                        <ol
                            className="flex items-center justify-between gap-2"
                            aria-orientation="horizontal"
                        >
                            {stepper.all.map((step, index, array) => (
                                <React.Fragment key={step.id}>
                                    <li className="flex items-center gap-4 flex-shrink-0">
                                        <Button
                                            type="button"
                                            role="tab"
                                            variant={
                                                index <= stepper.current.index ? 'default' : 'secondary'
                                            }
                                            aria-current={
                                                stepper.current.id === step.id ? 'step' : undefined
                                            }
                                            aria-posinset={index + 1}
                                            aria-setsize={steps.length}
                                            aria-selected={stepper.current.id === step.id}
                                            className="flex size-10 items-center justify-center rounded-full"
                                            onClick={() => stepper.goTo(step.id)}
                                        >
                                            {index + 1}
                                        </Button>
                                        <span className="text-sm font-medium">{step.label}</span>
                                    </li>
                                    {index < array.length - 1 && (
                                        <Separator
                                            className={`flex-1 ${index < stepper.current.index ? 'bg-purple-900' : 'bg-neutral-100'
                                                }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </ol>
                    </nav>
                </div>
                <div>
                    {stepper.switch({
                        type: () => <PropertyTypesComponent />,
                        address: () => <AddressComponent />,
                        complete: () => <CompleteComponent />,
                    })}
                </div>
                {!stepper.isLast ? (
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={stepper.prev}
                            disabled={stepper.isFirst}
                        >
                            Back
                        </Button>
                        <Button>{stepper.isLast ? 'Complete' : 'Next'}</Button>
                    </div>
                ) : (
                    <Button type="button" onClick={stepper.reset}>
                        Reset
                    </Button>
                )}
            </form>
        </Form>
    );

}



function AddressComponent() {
    useWatch({ name: "street" });
    const {
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext<AddressFormValues>();



    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        libraries,
    });
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;

        const options = {
            componentRestrictions: { country: "de" },
            fields: ["address_components"],
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));

        // return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    }, [isLoaded, loadError]);



    const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
        if (!isLoaded) return;
        const place = address.getPlace()

        if (!place) {
            setValue('street', '');
            return;
        }
        formData(place);
    };

    const formData = (data: google.maps.places.PlaceResult) => {
        const addressComponents = data?.address_components as google.maps.GeocoderAddressComponent[];

        const componentMap = {
            subPremise: "",
            premise: "",
            street_number: "",
            route: "",
            country: "",
            postal_code: "",
            administrative_area_level_2: "",
            administrative_area_level_1: "",
            locality: ""
        };
        console.log(addressComponents);

        console.log(errors);


        for (const component of addressComponents) {
            const componentType = component.types[0];
            if (componentMap.hasOwnProperty(componentType)) {
                componentMap[componentType] = component.long_name;
            }
        }
        const formattedAddress =
            `${componentMap.subPremise} ${componentMap.premise}  ${componentMap.route} ${componentMap.street_number}`.trim();

        console.log(formattedAddress);

        setValue('zipCode', componentMap.postal_code);
        setValue('street', formattedAddress);
        setValue('locality', componentMap.locality);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue('street', value);
    };


    return (isLoaded &&
        <div className='p-4'>
            <div className="flex flex-col w-full">
                <label
                    htmlFor={register('street').name}
                    className="text-md"
                >
                    Adresse
                </label>
                <Input
                    id={register('street').name}
                    {...register('street')}
                    type='text'
                    name='streetAddress'
                    placeholder='Adresse eingeben'
                    onChange={handleChange}
                    ref={inputRef}
                    value={getValues('street')}
                    className="block w-full p-2 border rounded-md"
                />
                {errors.street && (
                    <span className="text-sm text-red-600">
                        {errors.street.message}
                    </span>
                )}
            </div>
            <div className='grid grid-cols-3 gap-5 pt-5'>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor={register('houseNumber').name}
                        className="text-md"
                    >
                        Wohnungsnummer
                    </label>
                    <Input
                        id={register('houseNumber').name}
                        {...register('houseNumber')}
                        type='text'
                        name='houseNumber'
                        placeholder='Wohnungsnummer'
                        className="block w-full p-2 border rounded-md"
                    />
                    {errors.houseNumber && (
                        <span className="text-sm text-red-600">
                            {errors.houseNumber.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor={register('locality').name}
                        className="text-md"
                    >
                        Stadt
                    </label>
                    <Input
                        id={register('locality').name}
                        {...register('locality')}
                        type='text'
                        name='city'
                        placeholder='Stadt'
                        className="block w-full p-2 border rounded-md"
                    />
                    {errors.locality && (
                        <span className="text-sm text-red-600">
                            {errors.locality.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor={register('zipCode').name}
                        className="text-md"
                    >
                        PLZ
                    </label>
                    <Input
                        id={register('zipCode').name}
                        {...register('zipCode')}
                        type='text'
                        name='zipCode'
                        placeholder='PLZ'
                        className="block w-full p-2 border rounded-md"
                    />
                    {errors.zipCode && (
                        <span className="text-sm text-red-600">
                            {errors.zipCode.message}
                        </span>
                    )}
                </div>
                {/* <div className="space-y-2">
                <label
                    htmlFor={register('cvv').name}
                    className="block text-sm font-medium text-primary"
                >
                    CVV
                </label>
                <Input
                    id={register('cvv').name}
                    {...register('cvv')}
                    className="block w-full p-2 border rounded-md"
                />
                {errors.cvv && (
                    <span className="text-sm text-destructive">{errors.cvv.message}</span>
                )}
            </div> */}
            </div>
        </div>
    );
}

function CompleteComponent() {
  return <div className="text-center">Thank you! Your order is complete.</div>;
}
