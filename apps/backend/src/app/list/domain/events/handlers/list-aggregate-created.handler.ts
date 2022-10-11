import { InjectSimplelistLogger, SimplelistLogger } from '@simplelist/core';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ListAggregateCreatedEvent } from '../impl';

@EventsHandler(ListAggregateCreatedEvent)
export class ListAggregateCreatedHandler implements IEventHandler<ListAggregateCreatedEvent> {
  constructor(
    @InjectSimplelistLogger(ListAggregateCreatedEvent.name) private readonly logger: SimplelistLogger,
  ) {}

  public handle(event: ListAggregateCreatedEvent) {
    this.logger.debug({ event }, `Simply logging the ${ListAggregateCreatedHandler.name} for now`);
  }
}
