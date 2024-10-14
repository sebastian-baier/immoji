'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { Badge } from '@/components/badge'; // Assuming you have a Badge component
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { PropertyWithDetails } from '@/types/property';
import { PropertyTypes } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

const getStatusColor = (status: 'RENTED' | 'NOT_RENTED' | 'TERMINATED') => {
	switch (status) {
		case 'RENTED':
			return 'bg-green-500 text-white';
		case 'NOT_RENTED':
			return 'bg-red-500 text-white';
		case 'TERMINATED':
			return 'bg-yellow-500 text-black';
		default:
			return 'bg-gray-500 text-white';
	}
};

const getStatusIcon = (
	status: 'RENTED' | 'NOT_RENTED' | 'TERMINATED',
	type: PropertyTypes
) => {
	switch (type) {
		case PropertyTypes.APARTMENT:
			switch (status) {
				case 'RENTED':
					return <Icons.apartment size={1} />;
				case 'NOT_RENTED':
					return <Icons.apartmentRemove size={1} />;
				case 'TERMINATED':
					return <Icons.apartmentCog size={1} />;
			}
		case PropertyTypes.GARAGE:
			switch (status) {
				case 'RENTED':
					return <Icons.garage size={1} />;
				case 'NOT_RENTED':
					return <Icons.garageOpen size={1} />;
				case 'TERMINATED':
					return <Icons.garageAlert size={1} />;
			}
		case PropertyTypes.HOUSE:
			switch (status) {
				case 'RENTED':
					return <Icons.home size={1} />;
				case 'NOT_RENTED':
					return <Icons.homeAlert size={1} />;
				case 'TERMINATED':
					return <Icons.homeClock size={1} />;
			}

		default:
			switch (status) {
				case 'RENTED':
					return <Icons.apartment size={1} />;
				case 'NOT_RENTED':
					return <Icons.apartment size={1} />;
				case 'TERMINATED':
					return <Icons.apartment size={1} />;
			}
	}
};

export const PropertyCard = ({
	property
}: {
	property: PropertyWithDetails;
}) => {
	const router = useRouter(); // Hier useRouter verwenden
	const status = property.rentStatus; // Example rentStatus from your data

	return (
		<div
			className='relative w-[350px] px-4 py-6 border-2 border-slate-300 cursor-pointer rounded-3xl gap-2 flex flex-col'
			onClick={() => router.push(`/property/${property.id}`)}
		>
			{/* Status as Badge */}
			{/* Address and Other Property Info */}
			<Badge
				className={cn(
					'absolute -top-3 right-4',
					getStatusColor(status)
				)}
			>
				<span className='flex flex-row gap-1'>
					{getStatusIcon(status, property.type)}
				</span>
			</Badge>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col gap-0'>
					<label
						htmlFor='address'
						className='text-sm text-gray-400 font-medium'
					>
						Adresse
					</label>
					<div id='address' className='flex flex-row gap-1'>
						<p className='text-lg font-semibold'>
							{property.address}
						</p>
						<p className='text-lg font-semibold'>
							{property.houseNumber}
						</p>
					</div>
					<p className='text-lg font-semibold'>{property.zipCode}</p>
				</div>
				{property.objectNumber && (
					<div>
						<label
							className='text-sm text-gray-400 font-medium'
							htmlFor='object-number'
						>
							Objekt Nummer
						</label>
						<p
							id='object-number'
							className='text-lg font-semibold text-right'
						>
							{property.objectNumber}
						</p>
					</div>
				)}
			</div>
			<div className='flex flex-row'>
				<div>
					{property.area && (
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='area'
							>
								Fläche
							</label>
							<p id='area' className='text-sm'>
								{property.area} m²
							</p>
						</div>
					)}
					{property.roomCount && (
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='room-count'
							>
								Zimmer
							</label>
							<p id='room-count' className='text-sm'>
								{property.roomCount}
							</p>
						</div>
					)}
				</div>
				<div>
					{property.purchasePrice && (
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='rent-value'
							>
								Kaufpreis
							</label>
							<p id='rent-value' className='text-sm'>
								{property.rentValue} €
							</p>
						</div>
					)}
					<div className='flex flex-col gap-1'>
						<label
							className='text-sm text-gray-400 font-medium'
							htmlFor='rent-value'
						>
							Kaltmiete
						</label>
						<p id='rent-value' className='text-sm'>
							{property.rentValue} €
						</p>
					</div>
					{property.rendite && (
						<div className='text-sm'>
							Rendite: {property.rendite}%
						</div>
					)}
				</div>
			</div>
			<div className='relative flex flex-col gap-3 py-2 px-4 border-dotted border-2 rounded-3xl justify-center '>
				<p className='text-sm font-semibold'>Mieter</p>

				{!property.tenant ? (
					<Avatar className=' rounded-3xl  border-2 w-12 h-12 self-center'>
						<AvatarFallback>?</AvatarFallback>
					</Avatar>
				) : (
					<div className='grid grid-cols-2 gap-1 items-center justify-center'>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='first-name'
							>
								Vorname
							</label>
							<p id='first-name' className='text-sm'>
								{property.tenant?.firstName}
							</p>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='last-name'
							>
								Nachname
							</label>
							<p id='last-name' className='text-sm'>
								{property.tenant?.lastName}
							</p>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='email'
							>
								Email
							</label>
							<p id='email' className='text-sm'>
								{property.tenant?.email}
							</p>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm text-gray-400 font-medium'
								htmlFor='phone-number'
							>
								Telefonnummer
							</label>
							<p id='phone-number' className='text-sm'>
								{property.tenant?.phoneNumber}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
