import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
