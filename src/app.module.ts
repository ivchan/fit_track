import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Exercise } from './exercises/entities/exercise.entity';
import { ExercisesModule } from './exercises/exercises.module';
import { DailyWeight } from './daily-weights/entities/daily-weight';
import { DailyRecord } from './daily-records/entities/daily-record';
import { DailyWeightModule } from './daily-weights/daily-weight.module';
import { DailyRecordService } from './daily-records/daily-record.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rm35023504@tf',
      database: 'ivan_ft_db',
      entities: [User, Exercise, DailyWeight, DailyRecord],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ExercisesModule,
    DailyWeightModule,
    DailyRecordService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
