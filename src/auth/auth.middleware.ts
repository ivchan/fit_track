// src/auth/auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

//const jwt_secret = String(process.env.JWT_ACCESS_SECRET);

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  type: 'access' | 'refresh';
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    try {
      const payload = this.authService.verifyToken(token) as CustomJwtPayload;
      if (payload.type !== 'access') {
        throw new UnauthorizedException('Invalid token type');
      }
      // Attach user ID to request for use in controllers
      (req as any).user = { id: payload.sub, type: payload.type };
      next();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
