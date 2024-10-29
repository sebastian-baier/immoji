'use client';

import { Property, PropertyFeature } from '@prisma/client';

import { createProperty } from '@/actions/property/create-property';
import { PropertyWithNumbers } from '@/types/property';

import { Button } from './button';
import { Icons } from './icons';

export function CreatePropertyButton({
  data,
  children,
}: {
  data: PropertyWithNumbers;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={'icon'}
      size="icon"
      className="rounded-full p-2"
      aria-label="add-property"
      onClick={() => createProperty(data)}
    >
      <Icons.plus size={1} />
      {children}
    </Button>
  );
}
