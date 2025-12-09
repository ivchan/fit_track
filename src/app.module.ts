import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Exercise } from './exercise/entities/exercise.entity';
import { ExerciseModule } from './exercise/exercise.module';
import { DailyWeight } from './daily-weight/entities/daily-weight';
import { DailyRecord } from './daily-record/entities/daily-record';
import { DailyWeightModule } from './daily-weight/daily-weight.module';
import { AuthModule } from './auth/auth.module';
import { DailyRecordModule } from './daily-record/daily-record.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ft_db.sqlite',
      //type: 'mariadb',
      //host: 'localhost',
      //port: 3306,
      //username: 'root',
      //password: 'rm35023504@tf',
      //database: 'ivan_ft_db',
      entities: [User, Exercise, DailyWeight, DailyRecord],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ExerciseModule,
    DailyWeightModule,
    DailyRecordModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
