import { UniqueEntityID } from '@app/core/domain';
import { WasderError, WasderException } from '@app/server-errors';
import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ListDto } from '../../dto';
import { ListRepository } from '../../repositories';
import { CreateListCommand } from '../impl';

@Injectable()
@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand, ListDto> {
  constructor(
    private readonly repo: ListRepository,
    private readonly publisher: EventPublisher,
    private readonly mapper: BlockingTaskMapper,
  ) {}

  public async execute(command: CreateListCommand): Promise<ListDto> {
    const { input } = command;

    const blockingTask = BlockingTask.create({
      ...input,
      levelId: new UniqueEntityID(input.levelId),
      seasonId: found.id,
    });

    season.addBlockingTaskToLevel(blockingTask);

    this.logger.debug({ command, season }, 'saving the season on database');
    await this.seasonRepo.save(season);

    await this.repo.save()

    this.logger.debug({ command, season }, 'publishing all season events in the internal event bus');
    season.commit();

    this.logger.debug({ command, season }, 'Season updated correctly');
    return this.mapper.toDto(blockingTask);
  }
}
