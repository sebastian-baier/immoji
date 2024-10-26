'use server';

import { redirect } from 'next/navigation';

import { Button } from '@/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog';
import { Icons } from '@/components/icons';


import { getPropertiesOfOwner } from '@/actions/property/get-properties-of-owner';
import CreatePropertyForm from '@/containers/property/create-property-form';
import { PropertyCard } from '@/containers/property/property-card';
import { PropertyWithDetails } from '@/types/property';
import Link from 'next/link';
import { getCurrentSession } from '@/lib/auth/session';

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
      <div className='grid grid-cols-2 gap-4 items-center justify-center'>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={{
              ...property,
              additionalCosts: +property.additionalCosts,
              rentValue: +property.rentValue
            }}
          />
        ))}
        <div className='flex justify-center items-center'>

          <Button
            variant={'icon'}
            size='icon'
            className='rounded-full p-2'
            aria-label='add-property'
            asChild

          >
            <Link href={'/property/create'}>
              <Icons.plus size={2.5} />
            </Link>
          </Button>

          {/* <Dialog>
						<DialogTrigger asChild>
						</DialogTrigger>
						<DialogContent className='xl:max-w-[512px]'>
							<DialogHeader>
								<DialogTitle>
									Legen Sie Ihre Immobilien an
								</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Bitte füllen Sie das folgende Formular aus, um
								eine neue Immobilie anzulegen.
							</DialogDescription>
							<CreatePropertyForm userId={user.id} />
						</DialogContent>
					</Dialog> */}
        </div>
      </div>
    </div>
  );
}
