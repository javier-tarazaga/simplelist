import { Module } from '@nestjs/common';
import { UserService } from './list.service';
import { UserResolver } from './grapqhl/list.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
  ],
  exports: [
    UserService,
  ]
})
export class ListModule {}
