-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `Inventory_updatedBy_fkey`;

-- AlterTable
ALTER TABLE `inventory` MODIFY `updatedBy` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
