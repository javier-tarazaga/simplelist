import { UniqueEntityID } from '@app/core/domain/UniqueEntityID';
import { Mapper } from '@app/core/infra/Mapper';
import { Injectable } from '@nestjs/common';
import { BlockingTaskDto } from '@app/gamification-client';
import { BlockingTaskPersistedEntity, LevelPersistedEntity } from '../entities';
import { BlockingTask } from '../domain';

@Injectable()
export class ListMapper extends Mapper {
  public toDomain(persisted: BlockingTaskPersistedEntity): BlockingTask {
    return BlockingTask.create({
      title: persisted.title,
      description: persisted.description,
      striveCloudMilestoneId: persisted.striveCloudMilestoneId,
      createdAt: persisted.createdAt,
      updatedAt: persisted.updatedAt,
      levelId: new UniqueEntityID(persisted.levelId),
      seasonId: new UniqueEntityID(persisted.level.season.id),
    }, new UniqueEntityID(persisted.id));
  }

  public toPersistence(blockingTask: BlockingTask, level: LevelPersistedEntity): BlockingTaskPersistedEntity {
    const result = new BlockingTaskPersistedEntity();
    result.id = blockingTask.id.toString();
    result.title = blockingTask.title;
    result.description = blockingTask.description;
    result.striveCloudMilestoneId = blockingTask.striveCloudMilestoneId;
    result.level = level;
    result.levelId = level.id.toString();
    result.createdAt = blockingTask.createdAt;
    result.updatedAt = blockingTask.updatedAt;

    return result;
  }

  public toDto(blockingTask: BlockingTask): BlockingTaskDto {
    return {
      id: blockingTask.id.toString(),
      title: blockingTask.title,
      description: blockingTask.description,
      striveCloudMilestoneId: blockingTask.striveCloudMilestoneId,
      createdAt: blockingTask.createdAt,
      updatedAt: blockingTask.updatedAt,
      levelId: blockingTask.levelId.toString(),
      seasonId: blockingTask.seasonId.toString(),
    };
  }
}
