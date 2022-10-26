import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { RoleType } from "../enums";

@Injectable()
export class ACLGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    if (request?.user?.role?.type === RoleType.ADMIN) return true;
    const handler = ctx.getHandler();
    const controller = ctx.getClass();

    const controllerPath = Reflect.getMetadata(PATH_METADATA, controller);
    const crudHandler = [
      'createOneBase',
      'getOneBase',
      'deleteOneBase',
      'getManyBase',
      'updateOneBase',
    ];
    const needAddBaseSuffix = [
      'createOne',
      'getOne',
      'deleteOne',
      'getMany',
      'updateOne',
    ];
    let permission = controllerPath + '_';
    if (needAddBaseSuffix.includes(handler.name))
      permission += handler.name + 'Base';
    else if (crudHandler.includes(handler.name)) permission += handler.name;
    else permission += controller.name + '_' + handler.name;
    const haspermission =
      !!request?.user?.role?.permissions?.includes(permission);
    if (!haspermission) {
      throw new ForbiddenException('Không có quyền truy cập');
    }
    return haspermission;
  }
}
