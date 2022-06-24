import { MomentTransformer } from './MomentTransformer';
import { Moment } from 'moment-timezone';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  protected constructor(data: any) {
    Object.assign(this, data);
  }

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    transformer: new MomentTransformer(),
  })
  createdAt: Moment;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    transformer: new MomentTransformer({ enableAutoDateTime: true }),
  })
  updatedAt: Moment;
}
