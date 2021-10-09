import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// HTTP gql 요청도 물론 찍을 수 있다! ~ gql 모듈을 분리했다면, 분리한 라우터별로 로거 적용을 조정!
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP-GQL', { timestamp: false });
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body.operationName !== 'IntrospectionQuery') {
      // req
      const from = new Date();
      // res
      res.on('finish', () => {
        const to = new Date();
        const duration = (to.getTime() - from.getTime()) / 1000;
        this.logger.log(
          `${req.ip} ${req.body.query} ${res.statusCode} ${duration}\n`,
        );
      });
    }

    next();
  }
}
