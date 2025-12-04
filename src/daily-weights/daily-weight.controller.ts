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
import { DailyWeightService } from './daily-weight.service';
import { DailyWeight } from './entities/daily-weight';

@Controller('dailyweights')
export class DailyWeightController {
  constructor(private readonly dailyWeightService: DailyWeightService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createJson: DailyWeight): Promise<DailyWeight> {
    return this.dailyWeightService.create(createJson);
  }

  @Get()
  findAll(): Promise<DailyWeight[]> {
    return this.dailyWeightService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<DailyWeight | undefined> {
    return this.dailyWeightService.findOne(key);
  }

  @Put(':key')
  update(
    @Param('key') key: string,
    @Body() updateJson: DailyWeight,
  ): Promise<DailyWeight | undefined> {
    return this.dailyWeightService.update(key, updateJson);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.dailyWeightService.remove(key);
  }
}
