import { ListAggregate } from '../../list';

export class ListAggregateCreatedEvent {
  constructor(public readonly list: ListAggregate) {}
}
