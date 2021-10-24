import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * 공통 커스텀 데코레이터
 *  : 코드를 일괄적으로 관리해서 관리를 용이하게 한다! (중복 제거)
 */

// req 내부의 user 정보를 가져오는 데코레이더 (for gql)

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
