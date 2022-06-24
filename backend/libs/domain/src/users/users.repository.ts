import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { User } from './user.entity';

@Injectable()
@EntityRepository(User)
export class UsersRepository extends BaseRepository<User> {}
