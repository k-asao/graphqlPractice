import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), LoggerModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
