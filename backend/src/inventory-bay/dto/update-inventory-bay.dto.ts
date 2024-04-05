import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryBayDto } from './create-inventory-bay.dto';

export class UpdateInventoryBayDto extends PartialType(CreateInventoryBayDto) {}
