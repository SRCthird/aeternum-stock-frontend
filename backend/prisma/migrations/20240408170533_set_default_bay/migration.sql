-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryBay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "warehouseName" TEXT NOT NULL,
    "maxUniqueLots" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "InventoryBay_warehouseName_fkey" FOREIGN KEY ("warehouseName") REFERENCES "Warehouse" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InventoryBay" ("id", "maxUniqueLots", "name", "warehouseName") SELECT "id", "maxUniqueLots", "name", "warehouseName" FROM "InventoryBay";
DROP TABLE "InventoryBay";
ALTER TABLE "new_InventoryBay" RENAME TO "InventoryBay";
CREATE UNIQUE INDEX "InventoryBay_name_key" ON "InventoryBay"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
