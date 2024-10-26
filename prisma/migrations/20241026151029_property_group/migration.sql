/*
  Warnings:

  - You are about to drop the column `remainingBalance` on the `Loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "remainingBalance";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "propertyGroupId" TEXT;

-- CreateTable
CREATE TABLE "PropertyGroup" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PropertyGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyGroupId_fkey" FOREIGN KEY ("propertyGroupId") REFERENCES "PropertyGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
