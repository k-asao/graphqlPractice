import { DomainModule } from '@app/domain';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DomainModule],
  providers: [UsersResolver],
})
export class UsersModule {}
