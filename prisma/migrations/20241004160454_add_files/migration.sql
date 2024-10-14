/*
  Warnings:

  - You are about to drop the column `rentContract` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `RentHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RentHistory" DROP CONSTRAINT "RentHistory_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "rentContract",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RentHistory";

-- CreateTable
CREATE TABLE "RentAdjustmentHistory" (
    "id" SERIAL NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rentValue" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "increaseType" "RentIncreaseType" NOT NULL,
    "reason" TEXT,
    "document" TEXT,

    CONSTRAINT "RentAdjustmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FileTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FileTags_AB_unique" ON "_FileTags"("A", "B");

-- CreateIndex
CREATE INDEX "_FileTags_B_index" ON "_FileTags"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentAdjustmentHistory" ADD CONSTRAINT "RentAdjustmentHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileTags" ADD CONSTRAINT "_FileTags_A_fkey" FOREIGN KEY ("A") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileTags" ADD CONSTRAINT "_FileTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
