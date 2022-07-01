import { Resolver, Query } from '@nestjs/graphql';
import { User } from './model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => User)
  async me() {
    return this.userService.findOneById();
  }
}