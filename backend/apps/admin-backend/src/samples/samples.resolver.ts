import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import * as uuid from 'uuid';
import { CreateSampleInput } from './graphql/create-sample-input.gql';
import { Sample } from './graphql/sample.gql';

@Resolver()
export class SamplesResolver {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(SamplesResolver.name);
  }

  @Mutation(() => Sample)
  async createSample(
    @Args('input', new ValidationPipe()) input: CreateSampleInput,
  ): Promise<Sample> {
    return input;
  }

  @Query(() => Sample)
  async sample(): Promise<Sample> {
    return { id: uuid.v4() };
  }
}
