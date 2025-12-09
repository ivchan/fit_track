import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { DailyRecord } from './entities/daily-record';

@Injectable()
export class DailyRecordManagerService {
  constructor(
    @InjectRepository(DailyRecord)
    private dailyRecordRepository: Repository<DailyRecord>,
  ) {}

  /*
  async createRecord(recordDate: Date, person: string): Promise<DailyRecord> {
    const dailyRecord = new DailyRecord();
    dailyRecord.key = uuidv4();
    //const dailyRecord = this.dailyRecordRepository.create(createJson);
    //const savedEntity = await this.dailyRecordRepository.save(dailyRecord);
    return plainToClass(DailyRecord, savedEntity);
  }
    */
}
