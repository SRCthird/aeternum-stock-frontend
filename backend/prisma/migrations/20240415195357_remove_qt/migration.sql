/*
  Warnings:

  - You are about to drop the column `quantity` on the `Log` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fromLocation" TEXT NOT NULL,
    "toLocation" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "quantityMoved" INTEGER NOT NULL,
    "comments" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Log_fromLocation_fkey" FOREIGN KEY ("fromLocation") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_toLocation_fkey" FOREIGN KEY ("toLocation") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "ProductLot" ("lotNumber") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("comments", "dateTime", "fromLocation", "id", "lotNumber", "quantityMoved", "toLocation", "user") SELECT "comments", "dateTime", "fromLocation", "id", "lotNumber", "quantityMoved", "toLocation", "user" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
