import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProfileService {

  constructor(private databaseService: DatabaseService) {}

  create(createDto: Prisma.ProfileCreateInput) {
    return this.databaseService.profile.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.profile.findMany();
  }

  findOne(id: number) {
    return this.databaseService.profile.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.ProfileUpdateInput) {
    return this.databaseService.profile.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.profile.delete({ where: { id } });
  }
}
