import { logger } from '@app/utils/logger';
import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AdminBackendService } from './admin-backend.service';

@Controller()
export class AdminBackendController {
  constructor(private readonly adminBackendService: AdminBackendService) {}

  @Post('/api/test')
  test(@Req() req: Request) {
    const { headers, body } = req;
    logger.info({ msg: '遅延実行試験', headers, body });

    Promise.resolve().then(async () => {
      logger.info('スリープ開始');
      await await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000)); // 1h
      logger.info('スリープ終了');
    });

    logger.info({ msg: 'レスポンス返却', headers, body });
    return 'OK';
  }
}
