/*
  Warnings:

  - You are about to drop the column `productProfileId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `inventorySpaceId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `productProfileId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `lotNumber` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productLotId` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryBayId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productLotId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProductLot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "internalReference" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductLot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromLocationId" INTEGER NOT NULL,
    "toLocationId" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productLotId" INTEGER NOT NULL,
    "quantityMoved" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "Log_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_productLotId_fkey" FOREIGN KEY ("productLotId") REFERENCES "ProductLot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("comments", "dateTime", "fromLocationId", "id", "quantityMoved", "toLocationId", "userId") SELECT "comments", "dateTime", "fromLocationId", "id", "quantityMoved", "toLocationId", "userId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productLotId" INTEGER NOT NULL,
    "inventoryBayId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "Inventory_productLotId_fkey" FOREIGN KEY ("productLotId") REFERENCES "ProductLot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_inventoryBayId_fkey" FOREIGN KEY ("inventoryBayId") REFERENCES "InventoryBay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("createdAt", "createdBy", "id", "quantity", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "id", "quantity", "updatedAt", "updatedBy" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Product" ("description", "id") SELECT "description", "id" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductLot_lotNumber_key" ON "ProductLot"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLot_internalReference_key" ON "ProductLot"("internalReference");
