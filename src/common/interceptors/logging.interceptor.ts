import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as chalk from 'chalk';

import { PRIMARY_COLOR } from '../../environments';

// 미들웨어로 구현 로거 pre -> 인터셉터 구현 로거 -> 로직 -> 인터셉터 (post-request) -> 미들웨어 res finish event
// 그럼 미들웨어 vs 인터셉터 차이는? - 이벤트헨들러와 옵저버패턴 구현 방법의 차이?
// scope의 차이! ~ 좀더 넓은 범위 제어 (= 미들웨어) or response 직전 (post-request)에서 리턴값 컨트롤 가능 (=인터셉터)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getArgs()[3]) {
      console.log('logger by interceptor : pre-controller');
      const parentType = context.getArgs()[3]['parentType'];
      const fieldName = chalk
        .hex(PRIMARY_COLOR)
        .bold(`${context.getArgs()[3]['fieldName']}`);
      return next.handle().pipe(
        tap(() => {
          console.log('logger by interceptor : post-request');
          Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    } else {
      console.log('logger by interceptor : pre-controller');
      const parentType = chalk
        .hex(PRIMARY_COLOR)
        .bold(`${context.getArgs()[0].route.path}`);
      const fieldName = chalk
        .hex(PRIMARY_COLOR)
        .bold(`${context.getArgs()[0].route.stack[0].method}`);
      return next.handle().pipe(
        tap(() => {
          console.log('logger by interceptor : post-request');
          Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL');
        }),
      );
    }
  }
}
