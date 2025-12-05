import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const JWT_SECRET = String(process.env.JWT_ACCESS_SECRET);
const SALT_ROUNDS = 10;
const USERS = [
  {
    userKey: 'c5d0edc7-3c11-4f1f-a430-1cdb8a3b1953',
    username: 'sysadmin',
    password: bcrypt.hashSync('pass1234', SALT_ROUNDS),
  },
  {
    userKey: 'ddbc137c-5103-41fd-8c20-6180a74e479a',
    username: 'ivanchan',
    password: bcrypt.hashSync('pass1234', SALT_ROUNDS),
  },
];

@Injectable()
export class AuthService {
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
    userName: string,
    password: string,
  ): Promise<{ userKey: string } | null> {
    const user = USERS.find((u) => u.username === userName);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? { userKey: user.userKey } : null;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}
