/*
  Warnings:

  - A unique constraint covering the columns `[objectNumber,zipCode,address,houseNumber]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `objectNumber` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "objectNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_objectNumber_zipCode_address_houseNumber_key" ON "Property"("objectNumber", "zipCode", "address", "houseNumber");
