import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // gqlHost 객체로 변환!
    const gqlHost = GqlArgumentsHost.create(host);
    console.log('error catch!');
    return exception;
  }
}
