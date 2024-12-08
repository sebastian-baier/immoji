import * as React from 'react'
import { useEffect, useRef, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Libraries, useLoadScript } from '@react-google-maps/api'
import { Input } from '@/components/ui/input'
import { PropertyFormValues } from '@/lib/zod/property-schemas'

const libraries: Libraries = ['places']

type ComponentMap = {
	subPremise: string
	premise: string
	street_number: string
	route: string
	country: string
	postal_code: string
	administrative_area_level_2: string
	administrative_area_level_1: string
	locality: string
}

export function AddressComponent() {
	const {
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useFormContext<PropertyFormValues>()

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
		libraries,
	})
	const inputRef = useRef<HTMLInputElement>(null)

	const formData = useCallback(
		(data: google.maps.places.PlaceResult) => {
			const addressComponents =
				data?.address_components as google.maps.GeocoderAddressComponent[]
			const componentMap: ComponentMap = {
				subPremise: '',
				premise: '',
				street_number: '',
				route: '',
				country: '',
				postal_code: '',
				administrative_area_level_2: '',
				administrative_area_level_1: '',
				locality: '',
			}

			for (const component of addressComponents) {
				const componentType = component.types[0] as keyof ComponentMap
				if (componentType in componentMap) {
					componentMap[componentType] = component.long_name
				}
			}

			const formattedAddress =
				`${componentMap.subPremise} ${componentMap.premise} ${componentMap.route} ${componentMap.street_number}`.trim()

			// Parse postal code as number
			const postalCode = parseInt(componentMap.postal_code, 10)

			setValue('zipCode', postalCode)
			setValue('street', formattedAddress)
			setValue('locality', componentMap.locality)
		},
		[setValue],
	)

	useEffect(() => {
		if (!isLoaded || loadError) return

		const options = {
			componentRestrictions: { country: 'de' },
			fields: ['address_components'],
		}

		const autocomplete = new google.maps.places.Autocomplete(
			inputRef.current!,
			options,
		)

		const handlePlaceChanged = () => {
			const place = autocomplete.getPlace()
			if (place) {
				formData(place)
			}
		}

		autocomplete.addListener('place_changed', handlePlaceChanged)

		return () => {
			google.maps.event.clearInstanceListeners(autocomplete)
		}
	}, [isLoaded, loadError, formData])

	if (!isLoaded) return <div>Loading...</div>
	if (loadError) return <div>Error loading Google Maps API</div>

	return (
		<div className='p-4'>
			<div className='flex w-full flex-col'>
				<label htmlFor={register('street').name} className='text-md'>
					Adresse
				</label>
				<Input
					id={register('street').name}
					{...register('street')}
					type='text'
					name='streetAddress'
					placeholder='Adresse eingeben'
					ref={inputRef}
					className='block w-full rounded-md border p-2'
				/>
				{errors.street && (
					<span className='text-sm text-red-600'>
						{errors.street.message}
					</span>
				)}
			</div>
			<div className='grid grid-cols-3 gap-5 pt-5'>
				<div className='flex w-full flex-col'>
					<label
						htmlFor={register('houseNumber').name}
						className='text-md'
					>
						Wohnungsnummer
					</label>
					<Input
						id={register('houseNumber').name}
						{...register('houseNumber')}
						type='text'
						name='houseNumber'
						placeholder='Wohnungsnummer'
						className='block w-full rounded-md border p-2'
					/>
					{errors.houseNumber && (
						<span className='text-sm text-red-600'>
							{errors.houseNumber.message}
						</span>
					)}
				</div>
				<div className='flex w-full flex-col'>
					<label
						htmlFor={register('locality').name}
						className='text-md'
					>
						Stadt
					</label>
					<Input
						id={register('locality').name}
						{...register('locality')}
						type='text'
						name='city'
						placeholder='Stadt'
						className='block w-full rounded-md border p-2'
					/>
					{errors.locality && (
						<span className='text-sm text-red-600'>
							{errors.locality.message}
						</span>
					)}
				</div>
				<div className='flex w-full flex-col'>
					<label
						htmlFor={register('zipCode').name}
						className='text-md'
					>
						PLZ
					</label>
					<Input
						id={register('zipCode').name}
						{...register('zipCode', { valueAsNumber: true })}
						type='number'
						name='zipCode'
						placeholder='PLZ'
						className='block w-full rounded-md border p-2'
					/>
					{errors.zipCode && (
						<span className='text-sm text-red-600'>
							{errors.zipCode.message}
						</span>
					)}
				</div>
			</div>
		</div>
	)
}
