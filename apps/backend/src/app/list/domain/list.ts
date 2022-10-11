import { AggregateRoot, Optional, UniqueEntityID } from '@simplelist/core';
import { ListAggregateCreatedEvent } from './events/impl';
import { ListDisplayName } from './list-display-name';

interface ListProps {
  userId: UniqueEntityID;
  displayName: ListDisplayName;
  createdAt: Date;
  updatedAt: Date;
}

type ListCreateProps = Optional<ListProps, 'createdAt' | 'updatedAt'>;

export class ListAggregate extends AggregateRoot<ListProps> {
  public static create(props: ListCreateProps, id?: UniqueEntityID): ListAggregate {
    const now = new Date();
    const list = new ListAggregate({
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }, id);

    if (!id) {
      list.apply(new ListAggregateCreatedEvent(list));
    }

    return list;
  }

  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get displayName(): ListDisplayName {
    return this.props.displayName;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
