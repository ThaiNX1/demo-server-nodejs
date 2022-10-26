import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Decorator dùng để lấy thông tin User đã đăng nhập
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<any> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
