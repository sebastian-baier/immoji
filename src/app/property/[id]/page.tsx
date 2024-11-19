'use server'

import { notFound } from 'next/navigation'
import { Button } from '@/components/custom-ui/button'
import { Icons } from '@/components/custom-ui/icons'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { getPropertyById } from '@/actions/property/get-properties'
import { Banner } from '@/containers/property/banner'
import { RentStatus } from '@/types/property'

export default async function Property(props: {
  params: Promise<{ id: string }>
}) {
  const property = await getPropertyById((await props.params).id)

  if (!property) notFound()

  const status = !property.currentRenter
    ? RentStatus.NOT_RENTED
    : !property.currentRenter.endRentDate
      ? RentStatus.TERMINATED
      : RentStatus.RENTED

  function PropertyDetail({
    label,
    labelClassName,
    value,
    valueClassName,
    containerClassName,
  }: {
    label: string
    labelClassName?: string
    value: string
    valueClassName?: string
    containerClassName?: string
  }) {
    // TODO pass style to make more customizable
    return (
      <div
        className={cn(
          'flex flex-col items-center gap-2 rounded-md border-2 border-solid border-gray-100 p-4 shadow-md',
          containerClassName,
        )}
      >
        <Label
          className={cn('text-md text-gray-600', labelClassName)}
        >
          {label}
        </Label>
        <p className={cn('text-xl font-semibold', valueClassName)}>
          {value}
        </p>
      </div>
    )
  }

  function RentStatusBadge({
    rentStatus,
  }: {
    rentStatus: RentStatus
  }) {
    switch (rentStatus) {
      case RentStatus.NOT_RENTED:
        return (
          <Badge className='bg-red-600 text-lg'>
            Nicht vermietet
          </Badge>
        )
      case RentStatus.RENTED:
        return (
          <Badge className='bg-green-600 text-lg'>Vermietet</Badge>
        )
      case RentStatus.TERMINATED:
        return (
          <Badge className='bg-yellow-600 text-lg'>Gekündigt</Badge>
        )
    }
  }

  return (
    <div className='-m-12 flex flex-col items-start gap-12'>
      <Banner property={property} />

      <div className='flex w-full flex-row justify-between px-12'>
        <div className='grid grid-cols-3 gap-4'>
          <PropertyDetail
            containerClassName='col-span-3'
            label='Kaufpreis'
            value={
              !property.purchasePrice
                ? ''
                : `${property.purchasePrice.toString()} €`
            }
          />
          <PropertyDetail
            label='Kaltmiete'
            value={
              !property.rentValue
                ? ''
                : `${property.rentValue.toString()} €`
            }
            containerClassName='col-span-1'
          />
          <PropertyDetail
            label='Nebenkosten'
            value={
              !property.additionalCosts
                ? ''
                : `${property.additionalCosts.toString()} €`
            }
          />
          <Button className='col-span-3'>Mieterhöhung</Button>
          <PropertyDetail
            label='Wohnfläche'
            value={
              !property.area ? '' : `${property.area.toString()} m²`
            }
          />
          <PropertyDetail
            label='Zimmer Anzahl'
            value={
              !property.roomCount
                ? ''
                : `${property.roomCount.toString()}`
            }
          />
          <PropertyDetail
            label='Baujahr'
            value={
              !property.constructionYear
                ? ''
                : `${property.constructionYear.toString()}`
            }
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

        <div className='flex flex-col items-end gap-6'>
          <RentStatusBadge rentStatus={status} />
          <div className='relative flex flex-col justify-center gap-8 rounded-md border-2 border-solid border-gray-100 px-6 py-4 shadow-md'>
            <p className='text-md font-semibold text-gray-600'>
              Mieter
            </p>

            {property.currentRenter?.id ? (
              <>
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.firstName}
                </p>
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.lastName}
                </p>
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.email}
                </p>
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.phoneNumber}
                </p>
                {/* TODO change to local string and check which time is inputed in server (always
                convert to utc) */}
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.startRentDate.toString()}
                </p>
                <p className='text-sm font-semibold'>
                  {property.currentRenter?.endRentDate?.toString()}
                </p>
              </>
            ) : (
              <div className='flex flex-col items-center gap-4 px-8'>
                <p>kein Mieter vorhanden</p>
                <Button>
                  <Icons.plus />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
