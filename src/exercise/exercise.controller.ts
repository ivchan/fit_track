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
import { ExerciseService } from './exercise.service';
import { Exercise } from './entities/exercise.entity';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exercisesService: ExerciseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJson: Exercise): Promise<Exercise> {
    return this.exercisesService.create(createJson);
  }

  @Get()
  findAll(): Promise<Exercise[]> {
    return this.exercisesService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<Exercise | undefined> {
    return this.exercisesService.findOne(key);
  }

  @Put(':key')
  update(
    @Param('key') key: string,
    @Body() updateJson: Exercise,
  ): Promise<Exercise | undefined> {
    return this.exercisesService.update(key, updateJson);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.exercisesService.remove(key);
  }
}
