import { Loan, Property, PropertyFeature, PropertyTypes, Renter } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

// Stelle sicher, dass die richtigen Imports vorhanden sind

export type PropertyWithDetails = {
  userId: string; // Benutzer-ID
  id: string; // Immobilien-ID
  objectNumber: string | null; // Objektnummer
  address: string; // Adresse
  zipCode: number; // Postleitzahl
  houseNumber: string; // Hausnummer
  type: PropertyTypes; // Immobilientyp (Wohnung, Haus, etc.)
  rentValue: number; // Kaltmiete
  additionalCosts: number; // Nebenkosten
  rentStatus: 'RENTED' | 'NOT_RENTED' | 'TERMINATED'; // Mietstatus
  area: number | null; // Fläche
  roomCount: number | null; // Zimmeranzahl
  currentRenter: Renter | null; // Name des Mieters
  purchasePrice: number | null; // Kaufpreis
  yield: number | null; // Berechnete Rendite
  loans: Loan[];
};

type PropertyWithoutIdAndTimestamps = Omit<
  Property,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
> & {
  features?: Omit<PropertyFeature, 'id'>[];
};

export type PropertyWithNumbers = {
  [K in keyof PropertyWithoutIdAndTimestamps]: PropertyWithoutIdAndTimestamps[K] extends Decimal
    ? number
    : PropertyWithoutIdAndTimestamps[K] extends Decimal | null
      ? number | null // Wenn es Decimal | null ist, wird es zu number | null
      : PropertyWithoutIdAndTimestamps[K]; // Andernfalls bleibt der Typ unverändert
};
