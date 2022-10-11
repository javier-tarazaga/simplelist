import { Result, UniqueEntityID } from '@simplelist/core';
import { Injectable } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectSimplelistLogger, SimplelistLogger } from '@simplelist/core';
import { ListAggregate, ListDisplayName } from '../../domain';
import { ListDto } from '../../dto';
import { ListMapper } from '../../mappers';
import { ListRepository } from '../../repositories';
import { CreateListCommand } from '../impl';
import { ServerError, ServerException } from '@simplelist/server-errors';

@Injectable()
@CommandHandler(CreateListCommand)
export class CreateListHandler implements ICommandHandler<CreateListCommand, ListDto> {
  constructor(
    private readonly repo: ListRepository,
    private readonly publisher: EventPublisher,
    private readonly mapper: ListMapper,
    @InjectSimplelistLogger(CreateListHandler.name) private readonly logger: SimplelistLogger,
  ) {}

  public async execute(command: CreateListCommand): Promise<ListDto> {
    const {
      displayName,
      userId
     } = command.input;
    
    const displayNameOrError = ListDisplayName.create(displayName);
    const combinedPropsResult = Result.combine([
      displayNameOrError,
    ]);
    if (combinedPropsResult.isFailure) {
      throw new ServerException({
        error: ServerError.Common.InvalidParameter,
        message: combinedPropsResult.error
      });
    }

    const list = this.publisher.mergeObjectContext(
      ListAggregate.create({
        displayName: displayNameOrError.getValue(),
        userId: new UniqueEntityID(userId),
      })
    );

    this.logger.debug({ command, list }, 'saving the list on database');
    await this.repo.upsert(list);

    this.logger.debug({ command, list }, 'publishing all season events in the internal event bus');
    list.commit();

    this.logger.debug({ command, list }, 'List created correctly');
    return this.mapper.toDto(list);
  }
}
