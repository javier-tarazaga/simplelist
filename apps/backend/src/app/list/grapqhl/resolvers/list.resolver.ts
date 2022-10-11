import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateListInput, List } from '../model';
import { ListService } from '../../list.service';
import { User } from '../../../user/model';

@Resolver(() => List)
export class UserResolver {
  constructor(
    private readonly listService: ListService,
  ) {}

  @Mutation(() => List)
  async createList(
    @Context('me') me: User,
    @Args({ name: 'input', type: () => CreateListInput },
  ) input: CreateListInput) {
    return this.listService.create('c7cd2e45-93c9-42d5-aec3-a6c5431c6717', input);
  }
}