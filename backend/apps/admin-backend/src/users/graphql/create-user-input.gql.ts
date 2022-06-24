import { Field, InputType } from '@nestjs/graphql';
import * as v from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @v.IsString()
  @v.IsNotEmpty()
  name: string;

  @Field()
  @v.IsNumber()
  @v.IsNotEmpty()
  age: number;
}
