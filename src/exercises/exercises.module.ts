import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService],
  controllers: [ExercisesController],
  exports: [ExercisesService],
})
export class ExercisesModule {}
