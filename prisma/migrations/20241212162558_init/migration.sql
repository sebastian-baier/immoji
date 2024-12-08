/*
  Warnings:

  - The primary key for the `Loan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Maintenance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Property` table. All the data in the column will be lost.
  - The primary key for the `RentAdjustmentHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `FileTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RenterHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FileTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Type` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renterId` to the `RentAdjustmentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RenterHistory" DROP CONSTRAINT "RenterHistory_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "RenterHistory" DROP CONSTRAINT "RenterHistory_renterId_fkey";

-- DropForeignKey
ALTER TABLE "_FileTags" DROP CONSTRAINT "_FileTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileTags" DROP CONSTRAINT "_FileTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_MaintenanceFiles" DROP CONSTRAINT "_MaintenanceFiles_B_fkey";

-- DropForeignKey
ALTER TABLE "_RentAdjustmentFiles" DROP CONSTRAINT "_RentAdjustmentFiles_B_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Loan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Loan_id_seq";

-- AlterTable
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Maintenance_id_seq";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "address",
DROP COLUMN "type",
ADD COLUMN     "Type" "PropertyTypes" NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "propertyManagementId" TEXT,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RentAdjustmentHistory" DROP CONSTRAINT "RentAdjustmentHistory_pkey",
ADD COLUMN     "renterId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RentAdjustmentHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RentAdjustmentHistory_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";

-- AlterTable
ALTER TABLE "_MaintenanceFiles" ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_MaintenanceFiles_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_MaintenanceFiles_AB_unique";

-- AlterTable
ALTER TABLE "_PropertyFeatures" ADD CONSTRAINT "_PropertyFeatures_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PropertyFeatures_AB_unique";

-- AlterTable
ALTER TABLE "_RentAdjustmentFiles" ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_RentAdjustmentFiles_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RentAdjustmentFiles_AB_unique";

-- DropTable
DROP TABLE "FileTag";

-- DropTable
DROP TABLE "RenterHistory";

-- DropTable
DROP TABLE "_FileTags";

-- CreateTable
CREATE TABLE "PropertyManagement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "PropertyManagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyManagementEmployee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "propertyManagementId" TEXT,

    CONSTRAINT "PropertyManagementEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_PropertyRenterHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PropertyRenterHistory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FileToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FileToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyManagement_name_key" ON "PropertyManagement"("name");

-- CreateIndex
CREATE INDEX "_PropertyRenterHistory_B_index" ON "_PropertyRenterHistory"("B");

-- CreateIndex
CREATE INDEX "_FileToTag_B_index" ON "_FileToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_email_key" ON "Renter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyManagementId_fkey" FOREIGN KEY ("propertyManagementId") REFERENCES "PropertyManagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyManagementEmployee" ADD CONSTRAINT "PropertyManagementEmployee_propertyManagementId_fkey" FOREIGN KEY ("propertyManagementId") REFERENCES "PropertyManagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentAdjustmentHistory" ADD CONSTRAINT "RentAdjustmentHistory_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyRenterHistory" ADD CONSTRAINT "_PropertyRenterHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyRenterHistory" ADD CONSTRAINT "_PropertyRenterHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "Renter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceFiles" ADD CONSTRAINT "_MaintenanceFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Maintenance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RentAdjustmentFiles" ADD CONSTRAINT "_RentAdjustmentFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "RentAdjustmentHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToTag" ADD CONSTRAINT "_FileToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToTag" ADD CONSTRAINT "_FileToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
