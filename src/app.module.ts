import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import { CommonUtilModule } from './util/common-util.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MealModule } from './meal/meal.module';
import { User } from './user/entities/user.entity';
import { Meal } from './meal/entities/meal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ft_db.sqlite',
      entities: [User, Meal],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: () => ({
        store: redisStore,
        host: '10.65.158.66',
        post: 6379,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MealModule,
    CommonUtilModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
