import * as v from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSampleInput {
  @Field()
  @v.IsUUID()
  id: string;
}
