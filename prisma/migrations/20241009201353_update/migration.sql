/*
  Warnings:

  - You are about to drop the column `document` on the `RentAdjustmentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `increaseType` on the `RentAdjustmentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FileTags" DROP CONSTRAINT "_FileTags_B_fkey";

-- DropIndex
DROP INDEX "Property_objectNumber_zipCode_address_houseNumber_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "renterId" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "area" DOUBLE PRECISION,
ADD COLUMN     "constructionYear" INTEGER,
ADD COLUMN     "roomCount" INTEGER;

-- AlterTable
ALTER TABLE "RentAdjustmentHistory" DROP COLUMN "document",
DROP COLUMN "increaseType";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropEnum
DROP TYPE "RentIncreaseType";

-- DropEnum
DROP TYPE "TransactionCategorie";

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PropertyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenterHistory" (
    "id" TEXT NOT NULL,
    "renterId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "RenterHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FileTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyFeatures" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MaintenanceFiles" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RentAdjustmentFiles" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionCategory_name_key" ON "TransactionCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeature_name_key" ON "PropertyFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FileTag_name_key" ON "FileTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyFeatures_AB_unique" ON "_PropertyFeatures"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyFeatures_B_index" ON "_PropertyFeatures"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MaintenanceFiles_AB_unique" ON "_MaintenanceFiles"("A", "B");

-- CreateIndex
CREATE INDEX "_MaintenanceFiles_B_index" ON "_MaintenanceFiles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RentAdjustmentFiles_AB_unique" ON "_RentAdjustmentFiles"("A", "B");

-- CreateIndex
CREATE INDEX "_RentAdjustmentFiles_B_index" ON "_RentAdjustmentFiles"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterHistory" ADD CONSTRAINT "RenterHistory_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterHistory" ADD CONSTRAINT "RenterHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyFeatures" ADD CONSTRAINT "_PropertyFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyFeatures" ADD CONSTRAINT "_PropertyFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceFiles" ADD CONSTRAINT "_MaintenanceFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaintenanceFiles" ADD CONSTRAINT "_MaintenanceFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "Maintenance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RentAdjustmentFiles" ADD CONSTRAINT "_RentAdjustmentFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RentAdjustmentFiles" ADD CONSTRAINT "_RentAdjustmentFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "RentAdjustmentHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileTags" ADD CONSTRAINT "_FileTags_B_fkey" FOREIGN KEY ("B") REFERENCES "FileTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
