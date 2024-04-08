-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductLot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "internalReference" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    CONSTRAINT "ProductLot_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InventoryBay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "maxUniqueLots" INTEGER NOT NULL,
    CONSTRAINT "InventoryBay_warehouseName_fkey" FOREIGN KEY ("warehouseName") REFERENCES "Warehouse" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "Inventory_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "ProductLot" ("lotNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_location_fkey" FOREIGN KEY ("location") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "quantityMoved" INTEGER NOT NULL,
    "comments" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Log_fromLocation_fkey" FOREIGN KEY ("fromLocation") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_toLocation_fkey" FOREIGN KEY ("toLocation") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "ProductLot" ("lotNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLot_lotNumber_key" ON "ProductLot"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLot_internalReference_key" ON "ProductLot"("internalReference");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_name_key" ON "Warehouse"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InventoryBay_name_key" ON "InventoryBay"("name");
