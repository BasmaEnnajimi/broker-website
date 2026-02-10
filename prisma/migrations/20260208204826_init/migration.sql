-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('FOR_SALE', 'SOLD');

-- CreateEnum
CREATE TYPE "PropertyDetailCategory" AS ENUM ('BUILDING_INFO', 'EXPENSE', 'ROOM');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "mls" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "PropertyStatus" NOT NULL,
    "type" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "sqft" INTEGER NOT NULL,
    "yearBuilt" INTEGER NOT NULL,
    "parking" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlights" TEXT[],
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyDetail" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category" "PropertyDetailCategory" NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertyDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyCharacteristic" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertyCharacteristic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_mls_key" ON "Property"("mls");

-- AddForeignKey
ALTER TABLE "PropertyDetail" ADD CONSTRAINT "PropertyDetail_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyCharacteristic" ADD CONSTRAINT "PropertyCharacteristic_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
