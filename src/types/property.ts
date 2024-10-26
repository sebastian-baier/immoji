import { PropertyTypes, Renter } from '@prisma/client';

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
  tenant: Renter | null; // Name des Mieters
  purchasePrice: number | null; // Kaufpreis
  yield: number | null; // Berechnete Rendite
};
