import { Module } from '@nestjs/common';
import { UserService } from './list.service';
import { UserResolver } from './list.resolver';

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
