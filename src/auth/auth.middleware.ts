// src/auth/auth.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

//const jwt_secret = String(process.env.JWT_ACCESS_SECRET);
const EXCLUDED_PATHS = ['/auth/login', '/auth/refresh', '/auth/genhash'];

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (EXCLUDED_PATHS.some((path) => req.path.startsWith(path))) {
      return next(); // Early exit—no token check
    }

    const authHeader = req.headers.authorization;
    console.log('🔍 Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Missing/invalid header');
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    try {
      const payload = this.authService.verifyToken(token);
      //console.log('✅ Payload:', JSON.stringify(payload));

      if (payload.type !== 'access') {
        console.log('❌ Invalid type:', payload.type);
        throw new UnauthorizedException('Invalid token type');
      }
      // Attach user ID to request for use in controllers
      (req as any).jwt = {
        payload: {
          userKey: payload.sub,
          type: payload.type,
        },
      };

      next();
    } catch (error) {
      console.error('❌ Verification Error');
      throw new UnauthorizedException(error);
    }
  }
}
