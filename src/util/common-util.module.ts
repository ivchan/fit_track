import { Module } from '@nestjs/common';
import { CommonUtilService } from './common-util.service';

@Module({
  providers: [CommonUtilService],
  exports: [CommonUtilService],
})
export class CommonUtilModule {}
