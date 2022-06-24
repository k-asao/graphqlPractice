import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Sample {
  @Field()
  id: string;
}
