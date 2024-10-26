'use client'

import * as React from 'react';
import { z } from 'zod';

import { defineStepper } from '@stepperize/react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Separator } from '@/components/separator';
import { Icons } from '@/components/icons';
import { Card } from '@/components/card';
import { PropertyTypes } from '@prisma/client';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/form"

const shippingSchema = z.object({
    type: z.enum([PropertyTypes.APARTMENT, PropertyTypes.HOUSE, PropertyTypes.GARAGE],)
});

const paymentSchema = z.object({
    cardNumber: z.string().min(16, 'Card number is required'),
    expirationDate: z.string().min(5, 'Expiration date is required'),
    cvv: z.string().min(3, 'CVV is required'),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

const { useStepper, steps } = defineStepper(
    { id: 'type', label: 'Immobilientyp', schema: shippingSchema },
    { id: 'payment', label: 'Payment', schema: paymentSchema },
    { id: 'complete', label: 'Complete', schema: z.object({}) }
);

export default function Stepper() {
    const stepper = useStepper();
    // const [form, fields] = useForm({
    //     id: 'checkout',
    //     shouldValidate: 'onBlur',
    //     shouldRevalidate: 'onInput',
    //     constraint: getZodConstraint(stepper.current.schema),
    //     onValidate({ formData }) {
    //         return parseWithZod(formData, { schema: stepper.current.schema });
    //     },
    //     onSubmit(event, { submission }) {
    //         event.preventDefault();
    //         // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    //         console.log(`Form values for step ${stepper.current.id}:`, submission);
    //         if (stepper.isLast) {
    //             stepper.reset();
    //         } else {
    //             stepper.next();
    //         }
    //     },
    // });
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
                        type: () => <ShippingComponent />,
                        payment: () => <PaymentComponent />,
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

function ShippingComponent() {
    useWatch({ name: "type" });
    const {
        register,
        getValues,
        setValue
    } = useFormContext<ShippingFormValues>();


    return (
        <div className="grid grid-cols-3 gap-4 place-items-stretch" {...register('type')} >
            <Card className={`flex flex-col h-60 cursor-pointer hover:border-purple-900
                ${getValues('type') === PropertyTypes.GARAGE ? 'border-purple-900' : ''} 
                `}
                onClick={() => setValue('type', PropertyTypes.GARAGE)}
            >
                <Icons.garage className="self-center" size={8} />
                <p className="text-m self-center">
                    Garage
                </p>
                {getValues('type') === PropertyTypes.GARAGE ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
            <Card className={`flex flex-col h-60 hover:border-purple-900 cursor-pointer  
               ${getValues('type') === PropertyTypes.APARTMENT ? 'border-purple-900' : ''} 
                `}
                onClick={() => setValue('type', PropertyTypes.APARTMENT)}
            >
                <Icons.apartment className="self-center" size={8} />
                <p className="text-m self-center">
                    Wohnung
                </p>
                {getValues('type') === PropertyTypes.APARTMENT ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
            <Card className={`flex flex-col h-60 hover:border-purple-900  cursor-pointer  
             ${getValues('type') === PropertyTypes.HOUSE ? 'border-purple-900' : ''} 
                `}
                onClick={() => { console.log('ho'); setValue('type', PropertyTypes.HOUSE) }}
            >
                <Icons.home className="self-center fill-purple-900" size={8} />
                <p className="text-m self-center">
                    Haus
                </p>
                {getValues('type') === PropertyTypes.HOUSE ?
                    <Icons.checkCircle className='place-self-end text-purple-900' /> : <></>
                }
            </Card>
        </div>
    );
}

function PaymentComponent() {
    const {
        register,
        formState: { errors },
    } = useFormContext<PaymentFormValues>();

    return (
        <div className="space-y-4 text-start">
            <div className="space-y-2">
                <label
                    htmlFor={register('cardNumber').name}
                    className="block text-sm font-medium text-primary"
                >
                    Card Number
                </label>
                <Input
                    id={register('cardNumber').name}
                    {...register('cardNumber')}
                    className="block w-full p-2 border rounded-md"
                />
                {errors.cardNumber && (
                    <span className="text-sm text-destructive">
                        {errors.cardNumber.message}
                    </span>
                )}
            </div>
            <div className="space-y-2">
                <label
                    htmlFor={register('expirationDate').name}
                    className="block text-sm font-medium text-primary"
                >
                    Expiration Date
                </label>
                <Input
                    id={register('expirationDate').name}
                    {...register('expirationDate')}
                    className="block w-full p-2 border rounded-md"
                />
                {errors.expirationDate && (
                    <span className="text-sm text-destructive">
                        {errors.expirationDate.message}
                    </span>
                )}
            </div>
            <div className="space-y-2">
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
            </div>
        </div>
    );
}

function CompleteComponent() {
    return <div className="text-center">Thank you! Your order is complete.</div>;
}