
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthTokens {
  @Field()
  token: string;

  @Field()
  refreshToken: string;
}