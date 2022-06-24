import { User } from '@app/domain/users/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        Object.assign(
          {},
          await User.createInstance({
            name: 'asao',
            age: 23,
          }),
        ),
      ])
      .orIgnore(true)
      .execute();
  }
}
