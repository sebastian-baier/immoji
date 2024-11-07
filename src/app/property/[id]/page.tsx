'use server';

import { notFound } from 'next/navigation';

import { getPropertyById } from '@/actions/property/get-properties';
import { Banner } from '@/containers/property/banner';

export default async function Property(props: { params: Promise<{ id: string }> }) {
  const property = await getPropertyById((await props.params).id);

  if (!property) notFound();

  return (
    <div className="flex flex-col items-start gap-6 -m-12">
      <Banner property={property} />
    </div>
  );
}
