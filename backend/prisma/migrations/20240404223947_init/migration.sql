-- CreateTable
CREATE TABLE "ProductProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InventorySpace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "warehouseId" INTEGER NOT NULL,
    "maxUniqueLots" INTEGER NOT NULL,
    CONSTRAINT "InventorySpace_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productProfileId" INTEGER NOT NULL,
    "inventorySpaceId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "ProductLocation_productProfileId_fkey" FOREIGN KEY ("productProfileId") REFERENCES "ProductProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductLocation_inventorySpaceId_fkey" FOREIGN KEY ("inventorySpaceId") REFERENCES "InventorySpace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromLocationId" INTEGER NOT NULL,
    "toLocationId" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "productProfileId" INTEGER NOT NULL,
    "quantityMoved" INTEGER NOT NULL,
    "comments" TEXT,
    CONSTRAINT "ActivityLog_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "InventorySpace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityLog_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "InventorySpace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityLog_productProfileId_fkey" FOREIGN KEY ("productProfileId") REFERENCES "ProductProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductProfile_lotNumber_key" ON "ProductProfile"("lotNumber");
