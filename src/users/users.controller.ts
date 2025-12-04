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
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserJson: User): Promise<User> {
    return this.usersService.create(createUserJson);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<User | undefined> {
    return this.usersService.findOne(key);
  }

  @Put(':key')
  update(
    @Param('key') key: string,
    @Body() updateUserJson: User,
  ): Promise<User | undefined> {
    return this.usersService.update(key, updateUserJson);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.usersService.remove(key);
  }
}
