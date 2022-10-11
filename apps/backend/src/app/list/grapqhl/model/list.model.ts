
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class List {
  @Field()
  id: string;

  @Field()
  displayName: string;
}

@InputType()
export class CreateListInput {
  @Field()
  displayName: string;
}