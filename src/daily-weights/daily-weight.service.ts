import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { DailyWeight } from './entities/daily-weight';

@Injectable()
export class DailyWeightService {
  constructor(
    @InjectRepository(DailyWeight)
    private dailyWeightRepository: Repository<DailyWeight>,
  ) {}

  async create(createJson: DailyWeight): Promise<DailyWeight> {
    const dailyWeight = this.dailyWeightRepository.create(createJson);
    const savedEntity = await this.dailyWeightRepository.save(dailyWeight);
    return plainToClass(DailyWeight, savedEntity);
  }

  async findAll(): Promise<DailyWeight[]> {
    const weights = await this.dailyWeightRepository.find();
    return weights.map((weight) => plainToClass(DailyWeight, weight));
  }

  async findAllActive(): Promise<DailyWeight[]> {
    const weights = await this.dailyWeightRepository.find({
      where: { isActive: true },
    });
    return weights.map((weight) => plainToClass(DailyWeight, weight));
  }

  async findOne(key: string): Promise<DailyWeight | undefined> {
    const weight = await this.dailyWeightRepository.findOne({
      where: {
        key: key,
        isActive: true,
      },
    });
    if (!weight) {
      throw new NotFoundException(`Weight with ID [${key}] not found`); // Sets 404 + message
    }
    return plainToClass(DailyWeight, weight);
  }

  async update(
    key: string,
    updateJson: DailyWeight,
  ): Promise<DailyWeight | undefined> {
    await this.dailyWeightRepository.update(key, updateJson);
    const weight = this.findOne(key);
    return plainToClass(DailyWeight, weight);
  }

  async remove(key: string): Promise<void> {
    const weight = await this.findOne(key);
    if (!weight) {
      throw new NotFoundException(`Weight with ID [${key}] not found`); // Sets 404 + message
    }
    await this.dailyWeightRepository.delete(key);
  }
}
