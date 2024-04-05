/*
  Warnings:

  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventorySpace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ActivityLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InventorySpace";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductLocation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductProfile";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InventoryBay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "warehouseId" INTEGER NOT NULL,
    "maxUniqueLots" INTEGER NOT NULL,
    CONSTRAINT "InventoryBay_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productProfileId" INTEGER NOT NULL,
    "inventorySpaceId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "Inventory_productProfileId_fkey" FOREIGN KEY ("productProfileId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_inventorySpaceId_fkey" FOREIGN KEY ("inventorySpaceId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromLocationId" INTEGER NOT NULL,
    "toLocationId" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productProfileId" INTEGER NOT NULL,
    "quantityMoved" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "Log_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_productProfileId_fkey" FOREIGN KEY ("productProfileId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_lotNumber_key" ON "Product"("lotNumber");
