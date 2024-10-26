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

import { validateSession } from '@/actions/auth/validateSession';
import { getPropertiesOfOwner } from '@/actions/property/get-properties-of-owner';
import CreatePropertyForm from '@/containers/property/create-property-form';
import { PropertyCard } from '@/containers/property/property-card';
import { PropertyWithDetails } from '@/types/property';

export default async function Property() {
  const { user } = await validateSession();

  if (!user) {
    return redirect('/auth');
  }

  const properties: PropertyWithDetails[] = await getPropertiesOfOwner(user.id);

  return (
    <div className="flex flex-col items-start gap-12">
      <h2 className="text-xl font-semibold">Immobilien</h2>

      {/* todo add filter */}
      <div className="grid grid-cols-2 items-center justify-center gap-4">
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
        <div className="flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'icon'}
                size="icon"
                className="rounded-full p-2"
                aria-label="add-property"
              >
                <Icons.plus size={2.5} />
              </Button>
            </DialogTrigger>
            <DialogContent className="xl:max-w-[512px]">
              <DialogHeader>
                <DialogTitle>Legen Sie Ihre Immobilien an</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Bitte füllen Sie das folgende Formular aus, um eine neue Immobilie anzulegen.
              </DialogDescription>
              <CreatePropertyForm userId={user.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
