import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthenticateWithGithubInput {
  @Field()
  code: string;
}