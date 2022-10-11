import { ValueObject } from '@simplelist/core';
import { Guard, Result } from '@simplelist/core';

interface ListDisplayNameProps {
  value: string;
}

export class ListDisplayName extends ValueObject<ListDisplayNameProps> {
  private constructor(props: ListDisplayNameProps) {
    super(props);
  }

  public static create(displayName: string): Result<ListDisplayName> {
    const propsResult = Guard.againstNullOrUndefined(displayName, 'title');

    if (!propsResult.succeeded || displayName.length < 1 || displayName.length > 100) {
      return Result.fail<ListDisplayName>('List display name is invalid');
    }

    return Result.ok<ListDisplayName>(new ListDisplayName({ value: displayName }));
  }

  get value(): string {
    return this.props.value;
  }
}
