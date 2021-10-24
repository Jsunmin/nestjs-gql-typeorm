import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard : passport strategy를 자동으로 실행해줌
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // setting for gql
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
