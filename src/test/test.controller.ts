import { Controller, Get, Req } from '@nestjs/common';
import { BaseController } from 'src/common/base-controller';

@Controller('test')
export class TestController extends BaseController {
  @Get()
  testGet(@Req() req: Request) {
    const user = this.getUserKey(req);
    return user;
  }
}
