import { Injectable } from '@nestjs/common';
import { CreateInventoryBayDto } from './dto/create-inventory-bay.dto';
import { UpdateInventoryBayDto } from './dto/update-inventory-bay.dto';

@Injectable()
export class InventoryBayService {
  create(createInventoryBayDto: CreateInventoryBayDto) {
    return 'This action adds a new inventoryBay';
  }

  findAll() {
    return `This action returns all inventoryBay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryBay`;
  }

  update(id: number, updateInventoryBayDto: UpdateInventoryBayDto) {
    return `This action updates a #${id} inventoryBay`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryBay`;
  }
}
