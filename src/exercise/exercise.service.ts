import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createJson: Exercise): Promise<Exercise> {
    const exercise = this.exerciseRepository.create(createJson);
    const savedEntity = await this.exerciseRepository.save(exercise);
    return plainToClass(Exercise, savedEntity);
  }

  async findAll(): Promise<Exercise[]> {
    const exercises = await this.exerciseRepository.find();
    return exercises.map((exercise) => plainToClass(Exercise, exercise));
  }

  async findAllActive(): Promise<Exercise[]> {
    const exercises = await this.exerciseRepository.find({
      where: { isActive: true },
    });
    return exercises.map((exercise) => plainToClass(Exercise, exercise));
  }

  async findOne(key: string): Promise<Exercise | undefined> {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        key: key,
        isActive: true,
      },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID [${key}] not found`); // Sets 404 + message
    }
    return plainToClass(Exercise, exercise);
  }

  async update(
    key: string,
    updateJson: Exercise,
  ): Promise<Exercise | undefined> {
    await this.exerciseRepository.update(key, updateJson);
    const exercise = this.findOne(key);
    return plainToClass(Exercise, exercise);
  }

  async remove(key: string): Promise<void> {
    const exercise = await this.findOne(key);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID [${key}] not found`); // Sets 404 + message
    }
    await this.exerciseRepository.delete(key);
  }
}
