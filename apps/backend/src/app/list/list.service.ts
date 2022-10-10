import { Injectable } from '@nestjs/common';
import { ListDto } from './dto';
import { CreateListDto } from './dto/create-list.dto';

@Injectable()
export class ListService {
  create(input: CreateListDto): Promise<ListDto> {
  }
}