import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { ListAggregate } from '../domain';
@Injectable()
export class ListRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async upsert(list: ListAggregate): Promise<void> {
    await this.prisma.list.upsert({
      create: {
        displayName: list.displayName.value,
        name: list.name.value,
        userId: list.userId.toString(),
      },
      update: {
        displayName: list.displayName.value,
        name: list.name.value,
        userId: list.userId.toString(),
        updatedAt: list.updatedAt,
      },
      where: {
        id: list.id.toString(),
      },
    });
  }
}
