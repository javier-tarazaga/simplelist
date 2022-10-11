import { Injectable } from '@nestjs/common';
import { ListDisplayName, ListAggregate } from '../domain';
import { ListDto } from '../dto';
import { List } from '@prisma/client';
import { UniqueEntityID } from '@simplelist/core';

@Injectable()
export class ListMapper {
  public toDomain(persisted: List): ListAggregate {
    return ListAggregate.create({
      displayName: ListDisplayName.create(persisted.displayName).getValue(),
      userId: new UniqueEntityID(persisted.userId),
      createdAt: persisted.createdAt,
      updatedAt: persisted.updatedAt,
    }, new UniqueEntityID(persisted.id));
  }

  public toDto(list: ListAggregate): ListDto {
    return {
      id: list.id.toString(),
      displayName: list.displayName.value,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
    };
  }
}
