import { UsersService } from '@app/domain/users/users.service';
import { ValidationPipe } from '@nestjs/common';

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './graphql/create-user-input.gql';
import { User } from './graphql/user.gql';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAllUsers();
    return users.map(User.fromEntity);
  }

  @Mutation(() => User)
  async createUser(
    @Args('input', new ValidationPipe()) input: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(input);

    return User.fromEntity(user);
  }
}
