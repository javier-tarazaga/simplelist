import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateListCommand } from './commands/impl';
import { ListDto } from './dto';
import { CreateListInput } from './grapqhl/model';

@Injectable()
export class ListService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  create(userId: string, input: CreateListInput): Promise<ListDto> {
    return this.commandBus.execute(new CreateListCommand({
      ...input,
      userId,
    }));
  }
}