import type { JwtPayload } from '@/lib/types';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    key: keyof JwtPayload | undefined,
    ctx: ExecutionContext,
  ):
    | JwtPayload
    | Partial<JwtPayload>
    | JwtPayload[keyof JwtPayload]
    | undefined => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: JwtPayload | Partial<JwtPayload> }>();
    return key ? request.user[key] : request.user;
  },
);
