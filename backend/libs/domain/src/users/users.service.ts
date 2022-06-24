import { Injectable } from '@nestjs/common';
import { CreateUserProps, User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(props: CreateUserProps) {
    return await this.getUsersRepository().save(
      await User.createInstance(props),
    );
  }

  async findAllUsers() {
    return await this.getUsersRepository().find();
  }

  private getUsersRepository() {
    return this.usersRepository;
  }
}
