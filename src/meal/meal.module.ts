import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
})
export class MealModule {}
