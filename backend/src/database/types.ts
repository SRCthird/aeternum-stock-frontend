import { User, Product, ProductLot, Warehouse, Inventory, InventoryBay, Log } from "@prisma/client";

export type Database = {
  User: User;
  Product: Product;
  ProductLot: ProductLot;
  Warehouse: Warehouse;
  Inventory: Inventory;
  InventoryBay: InventoryBay;
  Log: Log;
}
