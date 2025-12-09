import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { RefreshDto } from './dto/RefreshDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.userCode,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.authService.signAccessToken(user.userKey);
    const refreshToken = this.authService.signRefreshToken(user.userKey);

    return {
      accessToken,
      refreshToken,
      userKey: user.userKey,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshDto: RefreshDto) {
    try {
      const payload = this.authService.verifyToken(refreshDto.refreshToken);
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const newAccessToken = this.authService.signAccessToken(
        payload.sub as string,
      );
      const newRefreshToken = this.authService.signRefreshToken(
        payload.sub as string,
      );
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userKey: payload.sub,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  @Get('genhash/:pwd')
  @HttpCode(HttpStatus.OK)
  genHash(@Param() params: { pwd: string }) {
    const hashValue = this.authService.hashPassword(params.pwd);
    return hashValue;
  }
}
