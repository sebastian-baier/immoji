import { Button } from '@/components/custom-ui/button';

import { PropertyWithDetails } from '@/types/property';

export function Banner({ property }: { property: PropertyWithDetails }) {
  return (
    <div className="flex flex-row items-center w-full bg-gray-300 py-12 rounded-t-3xl justify-between pr-6">
      <div className="flex flex-col gap-3 pl-16 py-4 pr-6 rounded-r-3xl bg-white">
        <div className="flex flex-row gap-2">
          <p className="text-2xl text-center font-semibold">{property.address}</p>
          <p className="text-2xl text-center font-semibold">{property.houseNumber}</p>
        </div>
        <div className="flex flex-row gap-4">
          <p className="text-2xl text-center font-semibold">{property.zipCode}</p>
        </div>
      </div>
      <p>TODO here should be a cool image or google maps</p>
      {/* TODO replace with icon of a pen or similar */}
      <Button>Edit Page</Button>
    </div>
  );
}
