import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { DailyRecord } from './entities/daily-record';

@Injectable()
export class DailyRecordService {
  constructor(
    @InjectRepository(DailyRecord)
    private dailyRecordRepository: Repository<DailyRecord>,
  ) {}

  async create(createJson: DailyRecord): Promise<DailyRecord> {
    const dailyRecord = this.dailyRecordRepository.create(createJson);
    const savedEntity = await this.dailyRecordRepository.save(dailyRecord);
    return plainToClass(DailyRecord, savedEntity);
  }

  async findAll(): Promise<DailyRecord[]> {
    const records = await this.dailyRecordRepository.find();
    return records.map((weight) => plainToClass(DailyRecord, weight));
  }

  async findAllActive(): Promise<DailyRecord[]> {
    const records = await this.dailyRecordRepository.find({
      where: { isActive: true },
    });
    return records.map((weight) => plainToClass(DailyRecord, weight));
  }

  async findOne(key: string): Promise<DailyRecord | undefined> {
    const record = await this.dailyRecordRepository.findOne({
      where: {
        key: key,
        isActive: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Record with ID [${key}] not found`); // Sets 404 + message
    }
    return plainToClass(DailyRecord, record);
  }

  async update(
    key: string,
    updateJson: DailyRecord,
  ): Promise<DailyRecord | undefined> {
    await this.dailyRecordRepository.update(key, updateJson);
    const record = this.findOne(key);
    return plainToClass(DailyRecord, record);
  }

  async remove(key: string): Promise<void> {
    const record = await this.findOne(key);
    if (!record) {
      throw new NotFoundException(`Record with ID [${key}] not found`); // Sets 404 + message
    }
    await this.dailyRecordRepository.delete(key);
  }
}
