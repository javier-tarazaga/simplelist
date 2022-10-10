import { InjectWasderLogger, WasderLogger } from '@app/core';
import { UniqueEntityID } from '@app/core/domain';
import { BlockingTaskDto } from '@app/gamification-client';
import { WasderError, WasderException } from '@app/server-errors';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BlockingTask } from 'src/season/domain';
import { ISeasonRepository } from 'src/season/interfaces';
import { BlockingTaskMapper } from 'src/season/mappers';
import { SeasonProviders } from 'src/season/season.providers';
import { StriveCloudService } from 'src/strivecloud/services';
import { ListDto } from '../../dto';
import { CreateBlockingTaskCommand, CreateListCommand } from '../impl';

@Injectable()
@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand, ListDto> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly mapper: BlockingTaskMapper,
  ) {}

  public async execute(command: CreateListCommand): Promise<ListDto> {
    const { input } = command;

    const found = await this.seasonRepo.getByLevelId(input.levelId);
    if (!found) {
      throw new WasderException({
        error: WasderError.Common.NotFound,
        message: 'Season not found',
      });
    }

    try {
      await this.striveCloudService.getMilestone(input.striveCloudMilestoneId);
    } catch (err) {
      this.logger.warn({ err, command }, 'milestone cannot be retrieved');
      throw new WasderException({
        error: WasderError.Common.InvalidParameter,
        message: 'Milestone cannot be retrieved',
      });
    }

    const season = this.publisher.mergeObjectContext(found);
    const blockingTask = BlockingTask.create({
      ...input,
      levelId: new UniqueEntityID(input.levelId),
      seasonId: found.id,
    });

    season.addBlockingTaskToLevel(blockingTask);

    this.logger.debug({ command, season }, 'saving the season on database');
    await this.seasonRepo.save(season);

    this.logger.debug({ command, season }, 'publishing all season events in the internal event bus');
    season.commit();

    this.logger.debug({ command, season }, 'Season updated correctly');
    return this.mapper.toDto(blockingTask);
  }
}
