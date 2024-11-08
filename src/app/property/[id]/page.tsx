'use server';

import { notFound } from 'next/navigation';

import { Button } from '@/components/custom-ui/button';
import { Icons } from '@/components/custom-ui/icons';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

import { getPropertyById } from '@/actions/property/get-properties';
import { Banner } from '@/containers/property/banner';

export default async function Property(props: { params: Promise<{ id: string }> }) {
  const property = await getPropertyById((await props.params).id);

  if (!property) notFound();

  function PropertyDetail({ label, value }: { label: string; value: string }) {
    // TODO pass style to make more customizable
    return (
      <div>
        <Label>{label}</Label>
        <p>{value}</p>
      </div>
    );
  }

  function RentStatusBadge({ rentStatus }: { rentStatus: 'RENTED' | 'NOT_RENTED' | 'TERMINATED' }) {
    switch (rentStatus) {
      case 'NOT_RENTED':
        return <Badge className="bg-red-600 text-lg">Nicht vermietet</Badge>;
      case 'RENTED':
        return <Badge className="bg-green-600 text-lg">Vermietet</Badge>;
      case 'TERMINATED':
        return <Badge className="bg-yellow-600 text-lg">Gekündigt</Badge>;
    }
  }

  return (
    <div className="flex flex-col items-start gap-12 -m-12">
      <Banner property={property} />

      <div className="w-full flex flex-row justify-between px-12">
        <div className="flex flex-col gap-4">
          <PropertyDetail
            label="Kaufpreis"
            value={!property.purchasePrice ? '' : `${property.purchasePrice.toString()} €`}
          />
          <PropertyDetail
            label="Kaltmiete"
            value={!property.rentValue ? '' : `${property.rentValue.toString()} €`}
          />
          <PropertyDetail
            label="Nebenkosten"
            value={!property.additionalCosts ? '' : `${property.additionalCosts.toString()} €`}
          />
          <PropertyDetail
            label="Wohnfläche"
            value={!property.area ? '' : `${property.area.toString()} m²`}
          />
          <PropertyDetail
            label="Zimmer Anzahl"
            value={!property.roomCount ? '' : `${property.roomCount.toString()}`}
          />
          {/* TODO add loans e.g. with carousel or dropdown */}
          {/* {property.loans && (
            <p>
            {property.loans
            .reduce(
              (acc, curr) => (curr.endDate > acc ? curr.endDate : acc),
              new Date('1970-01-01'),
              )
              .toString()}
              </p>
              )} */}
        </div>

        <div className="flex flex-col gap-6 items-start">
          <RentStatusBadge rentStatus={property.rentStatus} />
          <div className="relative flex flex-col justify-center gap-3 rounded-3xl border-2 border-dotted px-4 py-2">
            <p className="text-sm font-semibold">Mieter</p>

            {property.currentRenter?.id ? (
              <>
                <p className="text-sm font-semibold">{property.currentRenter?.firstName}</p>
                <p className="text-sm font-semibold">{property.currentRenter?.lastName}</p>
                <p className="text-sm font-semibold">{property.currentRenter?.email}</p>
                <p className="text-sm font-semibold">{property.currentRenter?.phoneNumber}</p>
                {/* TODO change to local string and check which time is inputed in server (always
                convert to utc) */}
                <p className="text-sm font-semibold">
                  {property.currentRenter?.startRentDate.toString()}
                </p>
                <p className="text-sm font-semibold">
                  {property.currentRenter?.endRentDate?.toString()}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-2 items-center">
                <p>bis jetzt kein Mieter vorhanden</p>
                <Button>
                  <Icons.plus />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
