import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

const JWT_SECRET = String(process.env.JWT_ACCESS_SECRET);
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signAccessToken(userKey: string): string {
    return jwt.sign({ sub: userKey, type: 'access' }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  signRefreshToken(userKey: string): string {
    return jwt.sign({ sub: userKey, type: 'refresh' }, JWT_SECRET, {
      expiresIn: '1w',
    });
  }

  verifyToken(token: string): jwt.JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async validateUser(
    userCode: string,
    password: string,
  ): Promise<{ userKey: string } | null> {
    const user = await this.userService.findOneByUserCode(userCode);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    return isPasswordValid ? { userKey: user.key } : null;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}
