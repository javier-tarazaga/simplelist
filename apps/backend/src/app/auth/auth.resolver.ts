import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthenticateWithGithubInput } from './inputs';
import { AuthTokens } from './models';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => AuthTokens)
  async authenticateWithGithub(
    @Args('input') input: AuthenticateWithGithubInput,
  ) {
    return this.authService.authenticateWithGithub(input);
  }
}