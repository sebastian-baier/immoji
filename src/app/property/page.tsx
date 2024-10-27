'use server';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/button';
import { Icons } from '@/components/icons';

import { getCurrentSession } from '@/lib/auth/session';

import { getPropertiesOfOwner } from '@/actions/property/get-properties-of-owner';
import { PropertyCard } from '@/containers/property/property-card';
import { PropertyWithDetails } from '@/types/property';

export default async function Property() {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect('/auth');
  }

  const properties: PropertyWithDetails[] = await getPropertiesOfOwner(user.id);

  return (
    <div className="flex flex-col items-start gap-12">
      <h2 className="text-xl font-semibold">Immobilien</h2>

      {/* todo add filter */}
      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={{
              ...property,
              additionalCosts: +property.additionalCosts,
              rentValue: +property.rentValue,
            }}
          />
        ))}
        <div className="flex justify-center items-center">
          <Button
            variant={'icon'}
            size="icon"
            className="rounded-full p-2"
            aria-label="add-property"
            asChild
          >
            <Link href={'/property/create'}>
              <Icons.plus size={2.5} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
