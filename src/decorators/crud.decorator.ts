import { applyDecorators, Controller } from '@nestjs/common';
import { Crud as CrudController } from '@nestjsx/crud';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CrudOptions, RoutesOptions } from '@nestjsx/crud/lib/interfaces';
import { capitalizeFirstLetter } from 'utils';
import { BaseRouteName } from '@nestjsx/crud/lib/types';
import { xor } from 'lodash';

const deepmerge = require('deepmerge');

interface Routes extends RoutesOptions {
  include?: BaseRouteName[];
}

interface Options extends CrudOptions {
  /* Tên controller, dùng cho path */
  controller: string;
  /* Tên của Models, routes */
  name?: string;
  routes?: Routes;
}

export function Crud(options: Options) {
  let enityName = options?.name;
  if (!enityName) enityName = options.model.type.name;
  const defaultExclude = ['createManyBase', 'replaceOneBase', 'deleteOneBase'];
  const newOptions: CrudOptions = deepmerge(options, {
    model: {
      type: options.model.type,
    },
    routes: {
      exclude: options?.routes?.include
        ? xor(defaultExclude, options.routes.include)
        : defaultExclude,
      getManyBase: {
        decorators: [
          ApiOperation({
            operationId: 'getManyBase',
            summary: `Danh sách ${enityName}`,
          }),
        ],
      },
      getOneBase: {
        decorators: [
          ApiOperation({
            operationId: 'getOneBase',
            summary: `Chi tiết ${enityName}`,
          }),
        ],
      },
      updateOneBase: {
        decorators: [
          ApiOperation({
            operationId: 'updateOneBase',
            summary: `Sửa ${enityName}`,
          }),
        ],
      },
      deleteOneBase: {
        decorators: [
          ApiOperation({
            operationId: 'deleteOneBase',
            summary: `Xoá ${enityName}`,
          }),
        ],
        returnDeleted: true,
      },
      createManyBase: {
        decorators: [
          ApiOperation({
            operationId: 'createManyBase',
            summary: `Thêm nhiều ${enityName}`,
          }),
        ],
      },
      createOneBase: {
        decorators: [
          ApiOperation({
            operationId: 'createOneBase',
            summary: `Thêm ${enityName}`,
          }),
        ],
      },
    },
  });
  return applyDecorators(
    CrudController(newOptions),
    ApiTags(capitalizeFirstLetter(options.controller)),
    Controller(options.controller),
  );
}
