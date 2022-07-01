
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field()
  username: string;
}