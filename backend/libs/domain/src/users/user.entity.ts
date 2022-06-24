import { BaseEntity } from '@app/utils/typeorm/BaseEntity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import * as v from 'class-validator';
import { validate } from '@app/utils/validate';
import { v4 as uuid } from 'uuid';

export type CreateUserProps = Pick<User, 'name' | 'age'>;

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
  @v.IsNotEmpty()
  @v.IsUUID()
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  @v.IsString()
  @v.IsNotEmpty()
  name: string;

  @Column({ name: 'age', type: 'smallint' })
  @v.IsNumber()
  @v.IsNotEmpty()
  age: number;

  static async createInstance(props: CreateUserProps) {
    const entity = new User({
      id: uuid(),
      ...props,
    });

    await validate(entity);
    return entity;
  }
}
