import { User as UserEntity } from '@app/domain/users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  age: number;

  static fromEntity(entity: UserEntity): User {
    return {
      id: entity.id,
      name: entity.name,
      age: entity.age,
    };
  }
}
