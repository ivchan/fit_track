import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userInfo } from 'os';

interface LoginDto {
  userName: string;
  password: string;
}

interface RefreshDto {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.userName,
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
}
