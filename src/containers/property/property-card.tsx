'use client';

import { useRouter } from 'next/navigation';

import { PropertyTypes } from '@prisma/client';

// Assuming you have a Badge component
import { Icons } from '@/components/custom-ui/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';

import { PropertyWithDetails, RentStatus } from '@/types/property';

const getStatusColor = (status: RentStatus) => {
  switch (status) {
    case RentStatus.RENTED:
      return 'bg-green-500 text-white';
    case RentStatus.NOT_RENTED:
      return 'bg-red-500 text-white';
    case RentStatus.TERMINATED:
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusIcon = (status: RentStatus, type: PropertyTypes) => {
  switch (type) {
    case PropertyTypes.APARTMENT:
      switch (status) {
        case RentStatus.RENTED:
          return <Icons.apartment size={1} />;
        case RentStatus.NOT_RENTED:
          return <Icons.apartmentRemove size={1} />;
        case RentStatus.TERMINATED:
          return <Icons.apartmentCog size={1} />;
      }
    case PropertyTypes.GARAGE:
      switch (status) {
        case RentStatus.RENTED:
          return <Icons.garage size={1} />;
        case RentStatus.NOT_RENTED:
          return <Icons.garageOpen size={1} />;
        case RentStatus.TERMINATED:
          return <Icons.garageAlert size={1} />;
      }
    case PropertyTypes.HOUSE:
      switch (status) {
        case RentStatus.RENTED:
          return <Icons.home size={1} />;
        case RentStatus.NOT_RENTED:
          return <Icons.homeAlert size={1} />;
        case RentStatus.TERMINATED:
          return <Icons.homeClock size={1} />;
      }

    default:
      switch (status) {
        case RentStatus.RENTED:
          return <Icons.apartment size={1} />;
        case RentStatus.NOT_RENTED:
          return <Icons.apartment size={1} />;
        case RentStatus.TERMINATED:
          return <Icons.apartment size={1} />;
      }
  }
};

export const PropertyCard = ({ property }: { property: PropertyWithDetails }) => {
  const router = useRouter(); // Hier useRouter verwenden
  const status = !property.currentRenter ? RentStatus.NOT_RENTED : !property.currentRenter.endRentDate ? RentStatus.TERMINATED : RentStatus.RENTED;

  return (
    <div
      className="relative flex w-[350px] cursor-pointer flex-col gap-5 rounded-3xl border-2 border-slate-300 px-4 py-6"
      onClick={() => router.push(`/property/${property.id}`)}
    >
      {/* Status as Badge */}
      {/* Address and Other Property Info */}
      <Badge className={cn('absolute -top-3 right-4', getStatusColor(status))}>
        <span className="flex flex-row gap-1">{getStatusIcon(status, property.type)}</span>
      </Badge>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-0">
          <label htmlFor="address" className="text-sm font-medium text-gray-400">
            Adresse
          </label>
          <div id="address" className="flex flex-row gap-1">
            <p className="text-lg font-semibold">{property.address}</p>
            <p className="text-lg font-semibold">{property.houseNumber}</p>
          </div>
          <p className="text-lg font-semibold">{property.zipCode}</p>
        </div>
        {property.objectNumber && (
          <div>
            <label className="text-sm font-medium text-gray-400" htmlFor="object-number">
              Objekt Nummer
            </label>
            <p id="object-number" className="text-right text-lg font-semibold">
              {property.objectNumber}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        {property.area && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-400" htmlFor="area">
              Fläche
            </label>
            <p id="area" className="text-sm">
              {property.area} m²
            </p>
          </div>
        )}
        {property.roomCount && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-400" htmlFor="room-count">
              Zimmer
            </label>
            <p id="room-count" className="text-sm">
              {property.roomCount}
            </p>
          </div>
        )}
        {property.purchasePrice && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-400" htmlFor="rent-value">
              Kaufpreis
            </label>
            <p id="rent-value" className="text-sm">
              {property.purchasePrice} €
            </p>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400" htmlFor="rent-value">
            Kaltmiete
          </label>
          <p id="rent-value" className="text-sm">
            {property.rentValue} €
          </p>
        </div>
        {property.purchasePrice && (
          <div className="text-sm">
            <label className="text-sm font-medium text-gray-400" htmlFor="rent-value">
              Rendite
            </label>
            <p id="rent-value" className="text-sm">
              {+(property.rentValue * 12 / property.purchasePrice * 100).toFixed(2)} %
            </p>
          </div>
        )}
      </div>
      <div className="relative flex flex-col justify-center gap-3 rounded-3xl border-2 border-dotted px-4 py-2">
        <p className="text-sm font-semibold">Mieter</p>

        {!property.currentRenter ? (
          <Avatar className="h-12 w-12 self-center rounded-3xl border-2">
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        ) : (
          <div className="grid grid-cols-2 items-center justify-center gap-1">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400" htmlFor="first-name">
                Vorname
              </label>
              <p id="first-name" className="text-sm">
                {property.currentRenter?.firstName}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400" htmlFor="last-name">
                Nachname
              </label>
              <p id="last-name" className="text-sm">
                {property.currentRenter?.lastName}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400" htmlFor="email">
                Email
              </label>
              <p id="email" className="text-sm">
                {property.currentRenter?.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400" htmlFor="phone-number">
                Telefonnummer
              </label>
              <p id="phone-number" className="text-sm">
                {property.currentRenter?.phoneNumber}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
