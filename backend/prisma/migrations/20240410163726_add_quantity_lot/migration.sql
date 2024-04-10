-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductLot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "internalReference" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductLot_productName_fkey" FOREIGN KEY ("productName") REFERENCES "Product" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductLot" ("id", "internalReference", "lotNumber", "productName") SELECT "id", "internalReference", "lotNumber", "productName" FROM "ProductLot";
DROP TABLE "ProductLot";
ALTER TABLE "new_ProductLot" RENAME TO "ProductLot";
CREATE UNIQUE INDEX "ProductLot_lotNumber_key" ON "ProductLot"("lotNumber");
CREATE UNIQUE INDEX "ProductLot_internalReference_key" ON "ProductLot"("internalReference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
