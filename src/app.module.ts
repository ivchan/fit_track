import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Exercise } from './exercise/entities/exercise.entity';
import { ExercisesModule } from './exercise/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rm35023504@tf',
      database: 'ivan_ft_db',
      entities: [User, Exercise],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ExercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
