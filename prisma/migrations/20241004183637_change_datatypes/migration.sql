/*
  Warnings:

  - You are about to alter the column `interestRate` on the `Loan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `rentValue` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `additionalCosts` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `rentValue` on the `RentAdjustmentHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "interestRate" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "rentValue" SET DEFAULT 0.0,
ALTER COLUMN "rentValue" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "additionalCosts" SET DEFAULT 0.0,
ALTER COLUMN "additionalCosts" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "RentAdjustmentHistory" ALTER COLUMN "rentValue" SET DATA TYPE DECIMAL(65,30);
