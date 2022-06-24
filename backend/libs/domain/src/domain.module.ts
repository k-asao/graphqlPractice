import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';

@Module({
  providers: [],
  imports: [DatabaseModule, UsersModule],
  exports: [UsersModule],
})
export class DomainModule {}
