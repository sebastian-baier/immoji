/*
  Warnings:

  - You are about to drop the column `propertyGroupId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `PropertyGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "PropertyTypes" ADD VALUE 'COMPLEX';

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_propertyGroupId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "propertyGroupId",
ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "PropertyGroup";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
