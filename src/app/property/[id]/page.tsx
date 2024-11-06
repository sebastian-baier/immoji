'use server';

import { notFound } from 'next/navigation';

import { getPropertyById } from '@/actions/property/get-properties';

export default async function Property(props: { params: Promise<{ id: string }> }) {
  const property = await getPropertyById((await props.params).id);

  if (!property) notFound();

  return <div className="flex flex-col items-start gap-6">{property.address}</div>;
}
