import { Req } from '@nestjs/common';

export class BaseController {
  getUserKey(@Req() req: Request): string {
    const jwt = (req as any).jwt;
    if (!jwt) {
      return '';
    }
    return jwt.payload?.userKey;
  }
}
