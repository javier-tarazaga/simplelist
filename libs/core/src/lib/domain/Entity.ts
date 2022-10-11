import { UniqueEntityID } from './UniqueEntityID';

export abstract class Entity<T> {
  public readonly id: UniqueEntityID;

  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    // eslint-disable-next-line no-underscore-dangle
    this.id = id || new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>) : boolean {
    const isEntity = (v: unknown): v is Entity<unknown> => v instanceof Entity;

    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}
