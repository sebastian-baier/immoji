'use client'

import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyTypes } from '@prisma/client'
import { defineStepper } from '@stepperize/react'
import { Button } from '@/components/custom-ui/button'
import { Separator } from '@/components/ui/separator'
import {
	propertySchema,
	PropertyFormValues,
} from '@/lib/zod/property-schemas'
import { AddressComponent } from './address-component'
import { PropertyTypesComponent } from './property-types'

const { useStepper, steps } = defineStepper(
	{
		id: 'type',
		label: 'Immobilientyp',
		schema: propertySchema.pick({ Type: true }),
	},
	{
		id: 'address',
		label: 'Adresse',
		schema: propertySchema.omit({ Type: true }),
	},
	{ id: 'complete', label: 'Complete', schema: propertySchema },
)

export default function PropertyStepper() {
	const stepper = useStepper()
	const methods = useForm<PropertyFormValues>({
		mode: 'onTouched',
		resolver: zodResolver(stepper.current.schema),
		defaultValues: {
			Type: PropertyTypes.APARTMENT,
			street: '',
			locality: '',
			zipCode: undefined,
			houseNumber: '',
		},
	})

	const onSubmit = (values: PropertyFormValues) => {
		console.log(`Form values for step ${stepper.current.id}:`, values)
		if (stepper.isLast) {
			stepper.reset()
		} else {
			stepper.next()
		}
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className='flex h-full w-[100%] flex-col justify-between rounded-lg border p-6'
			>
				<div className='flex flex-col gap-6'>
					<div className='flex justify-between'>
						<h2 className='text-lg font-medium'>
							Immobilie erstellen
						</h2>
						<div className='flex items-center gap-2'>
							<span className='text-muted-foreground text-sm'>
								Schritt {stepper.current.index + 1} von {steps.length}
							</span>
						</div>
					</div>
					<nav aria-label='Checkout Steps' className='group'>
						<ol
							className='flex items-center justify-between gap-2'
							aria-orientation='horizontal'
						>
							{stepper.all.map((step, index, array) => (
								<React.Fragment key={step.id}>
									<li className='flex flex-shrink-0 items-center gap-4'>
										<Button
											type='button'
											role='tab'
											variant={
												index <= stepper.current.index
													? 'default'
													: 'secondary'
											}
											aria-current={
												stepper.current.id === step.id
													? 'step'
													: undefined
											}
											aria-posinset={index + 1}
											aria-setsize={steps.length}
											aria-selected={stepper.current.id === step.id}
											className='flex size-10 items-center justify-center rounded-full'
											onClick={() => stepper.goTo(step.id)}
										>
											{index + 1}
										</Button>
										<span className='text-sm font-medium'>
											{step.label}
										</span>
									</li>
									{index < array.length - 1 && (
										<Separator
											className={`flex-1 ${
												index < stepper.current.index
													? 'bg-purple-900'
													: 'bg-neutral-100'
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
					<div className='flex justify-end gap-4'>
						<Button
							type='button'
							variant='secondary'
							onClick={stepper.prev}
							disabled={stepper.isFirst}
						>
							Back
						</Button>
						<Button type='submit'>
							{stepper.isLast ? 'Complete' : 'Next'}
						</Button>
					</div>
				) : (
					<Button type='button' onClick={stepper.reset}>
						Reset
					</Button>
				)}
			</form>
		</FormProvider>
	)
}

function CompleteComponent() {
	return (
		<div className='text-center'>
			Thank you! Your order is complete.
		</div>
	)
}
