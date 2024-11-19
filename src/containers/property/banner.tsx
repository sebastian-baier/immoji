import { Button } from '@/components/custom-ui/button';
import { Icons } from '@/components/custom-ui/icons';

import { PropertyWithDetails } from '@/types/property';

export function Banner({ property }: { property: PropertyWithDetails }) {
  function GetPropertyTypeIcon() {
    switch (property.type) {
      case 'APARTMENT':
        return <Icons.apartment size={3} />;
      case 'COMPLEX':
        return <Icons.apartment size={3} />;
      case 'HOUSE':
        return <Icons.home size={3} />;
      case 'GARAGE':
        return <Icons.garage size={3} />;
    }
  }

  return (
    <div className="flex flex-row items-center w-full bg-gray-300 py-12 rounded-t-3xl justify-between pr-6">
      <div className="flex flex-row gap-6 items-center pl-11 py-4 pr-6 rounded-r-3xl bg-white">
        <GetPropertyTypeIcon />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-1">
              <p className="text-2xl text-center font-semibold">{property.address}</p>
              <p className="text-2xl text-center font-semibold">{property.houseNumber}</p>
            </div>
            {/* <p className="text-2xl text-center font-semibold">-</p> */}
            {property.objectNumber && (
              <p className="text-2xl text-center font-semibold">{property.objectNumber}</p>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-2xl text-center font-semibold">{property.zipCode}</p>
          </div>
        </div>
      </div>
      <p>TODO here should be a cool image or google maps</p>
      {/* TODO replace with icon of a pen or similar */}
      <Button aria-label="edit page button">
        <Icons.fileOutlineEdit />
        Bearbeiten
      </Button>
    </div>
  );
}
