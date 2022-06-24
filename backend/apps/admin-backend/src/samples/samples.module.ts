import { DomainModule } from '@app/domain';
import { Module } from '@nestjs/common';
import { SamplesResolver } from './samples.resolver';

@Module({
  imports: [DomainModule],
  providers: [SamplesResolver],
})
export class SampleModule {}
