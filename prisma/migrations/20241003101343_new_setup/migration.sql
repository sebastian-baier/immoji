-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TransactionCategorie" AS ENUM ('UNKNOWN', 'PAY', 'PROPERTIES', 'STOCKS', 'FOOD', 'HEALTH', 'CAR', 'FUN');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('OUTGOING', 'INGOING');

-- CreateEnum
CREATE TYPE "PropertyTypes" AS ENUM ('UNKNOWN', 'APARTMENT', 'HOUSE', 'GARAGE');

-- CreateEnum
CREATE TYPE "RentIncreaseType" AS ENUM ('INFLATION', 'RENOVATION', 'MARKET_ADJUSTMENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "githubId" TEXT,
    "googleId" TEXT,
    "email" TEXT,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "picture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "value" DECIMAL(65,30) NOT NULL,
    "category" "TransactionCategorie" NOT NULL DEFAULT 'UNKNOWN',
    "type" "TransactionType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "type" "PropertyTypes" NOT NULL,
    "rentValue" DOUBLE PRECISION NOT NULL,
    "additionalCosts" DOUBLE PRECISION NOT NULL,
    "rentContract" TEXT,
    "currentRenterId" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Renter" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "startRentDate" TIMESTAMP(3) NOT NULL,
    "endRentDate" TIMESTAMP(3),

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentHistory" (
    "id" SERIAL NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rentValue" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "increaseType" "RentIncreaseType" NOT NULL,
    "reason" TEXT,
    "document" TEXT,

    CONSTRAINT "RentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "propertyId" TEXT NOT NULL,
    "lender" TEXT NOT NULL,
    "principalAmount" DECIMAL(65,30) NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "monthlyPayment" DECIMAL(65,30) NOT NULL,
    "remainingBalance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "propertyId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_zipCode_address_houseNumber_key" ON "Property"("zipCode", "address", "houseNumber");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_currentRenterId_fkey" FOREIGN KEY ("currentRenterId") REFERENCES "Renter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentHistory" ADD CONSTRAINT "RentHistory_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
