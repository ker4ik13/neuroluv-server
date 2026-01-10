import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return key && key in request.cookies
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        request.cookies[key]
      : key
        ? null
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          request.cookies;
  },
);
