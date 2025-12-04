import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyWeight } from './entities/daily-weight';
import { DailyWeightController } from './daily-weight.controller';
import { DailyWeightService } from './daily-weight.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyWeight])],
  providers: [DailyWeightService],
  controllers: [DailyWeightController],
  exports: [DailyWeightService],
})
export class DailyWeightModule {}
