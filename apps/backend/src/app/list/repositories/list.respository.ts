import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { Prisma } from '../../../generated/prisma-client';

@Injectable()
export class ListRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async save(data: Prisma.ListCreateInput): Promise<void> {
    return this.prisma.list.create({
      data,
    })
  }
}
