/*
  Warnings:

  - You are about to drop the column `userId` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `user` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;

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
INSERT INTO "new_Log" ("comments", "dateTime", "fromLocation", "id", "lotNumber", "quantityMoved", "toLocation") SELECT "comments", "dateTime", "fromLocation", "id", "lotNumber", "quantityMoved", "toLocation" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Profile_email_fkey" FOREIGN KEY ("email") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("id") SELECT "id" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lotNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT NOT NULL,
    CONSTRAINT "Inventory_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "ProductLot" ("lotNumber") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_location_fkey" FOREIGN KEY ("location") REFERENCES "InventoryBay" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("createdAt", "createdBy", "id", "location", "lotNumber", "quantity", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "id", "location", "lotNumber", "quantity", "updatedAt", "updatedBy" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
