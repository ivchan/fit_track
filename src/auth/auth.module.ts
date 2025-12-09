import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [AuthService, AuthMiddleware],
})
export class AuthModule {}
