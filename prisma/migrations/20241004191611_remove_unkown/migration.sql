/*
  Warnings:

  - The values [UNKNOWN] on the enum `PropertyTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyTypes_new" AS ENUM ('APARTMENT', 'HOUSE', 'GARAGE');
ALTER TABLE "Property" ALTER COLUMN "type" TYPE "PropertyTypes_new" USING ("type"::text::"PropertyTypes_new");
ALTER TYPE "PropertyTypes" RENAME TO "PropertyTypes_old";
ALTER TYPE "PropertyTypes_new" RENAME TO "PropertyTypes";
DROP TYPE "PropertyTypes_old";
COMMIT;
