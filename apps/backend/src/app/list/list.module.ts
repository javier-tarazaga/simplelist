import { Module } from '@nestjs/common';
import * as Mappers from './mappers';
import * as CommandHandlers from './commands/handlers';
import * as Repositories from './repositories';
import * as Resolvers from './grapqhl/resolvers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    ...Object.values(Mappers),
    ...Object.values(CommandHandlers),
    ...Object.values(Repositories),
    ...Object.values(Resolvers),
  ],
})
export class ListModule {}
