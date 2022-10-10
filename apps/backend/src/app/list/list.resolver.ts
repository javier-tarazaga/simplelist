import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateListInput, List } from './model';
import { ListService } from './list.service';

@Resolver(() => List)
export class UserResolver {
  constructor(
    private readonly listService: ListService,
  ) {}

  @Query(() => List)
  async lists() {
    return this.listService.findOneById();
  }

  @Mutation(() => List)
  async upvotePost(
    @Args({ name: 'input', type: () => CreateListInput }
  ) postId: number) {
    return this.listService.create({ id: postId });
  }
}