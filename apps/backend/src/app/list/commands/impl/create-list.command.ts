import { CreateListDto } from '../../dto/create-list.dto';

export class CreateListCommand {
  constructor(
    public input: CreateListDto,
  ) {}
}