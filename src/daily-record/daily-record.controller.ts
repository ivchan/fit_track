import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DailyRecordService } from './daily-record.service';
import { DailyRecord } from './entities/daily-record';

@Controller('dailyrecord')
export class DailyRecordController {
  constructor(private readonly dailyRecordService: DailyRecordService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJson: DailyRecord): Promise<DailyRecord> {
    return this.dailyRecordService.create(createJson);
  }

  @Get()
  findAll(): Promise<DailyRecord[]> {
    return this.dailyRecordService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<DailyRecord | undefined> {
    return this.dailyRecordService.findOne(key);
  }

  @Put(':key')
  update(
    @Param('key') key: string,
    @Body() updateJson: DailyRecord,
  ): Promise<DailyRecord | undefined> {
    return this.dailyRecordService.update(key, updateJson);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.dailyRecordService.remove(key);
  }
}
