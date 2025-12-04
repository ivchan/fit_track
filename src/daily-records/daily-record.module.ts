import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyRecord as DailyRecord } from './entities/daily-record';
import { DailyRecordController as DailyRecordController } from './daily-record.controller';
import { DailyRecordService as DailyRecordService } from './daily-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyRecord])],
  providers: [DailyRecordService],
  controllers: [DailyRecordController],
  exports: [DailyRecordService],
})
export class DailyRecordModule {}
