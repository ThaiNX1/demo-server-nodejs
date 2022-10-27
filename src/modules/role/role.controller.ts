import { BadRequestException, Body, Get, Param, Post } from '@nestjs/common';
import {
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { RoleEntity } from 'entities/role.entity';
import { RoleService } from './role.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Crud } from 'decorators/crud.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'decorators/auth.decorator';
import { GetManyDefaultResponse } from '@nestjsx/crud/lib/interfaces';
import { Not } from 'typeorm';

@Crud({
  controller: 'roles',
  name: 'Role',
  model: {
    type: RoleEntity,
  },
  routes: {
    deleteOneBase: {
      decorators: [Auth()],
    },
    updateOneBase: {
      decorators: [Auth()],
    },
    createOneBase: {
      decorators: [Auth()],
    },
  },
})
@Auth()
export class RoleController implements CrudController<RoleEntity> {
  constructor(
    public readonly service: RoleService,
    private httpService: HttpService,
  ) {}

  ignoreControllers = [
    'controller',
    'roles',
    'permissions',
    'provinces',
    'districts',
    'wards',
    'product-category',
    'product-category-attributes',
  ];

  get base(): CrudController<RoleEntity> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RoleEntity,
  ): Promise<RoleEntity> {
    const checkRoleName = await this.service.repo.findOne({
      where: {
        name: dto.name,
      },
    });
    if (checkRoleName)
      throw new BadRequestException('Tên nhóm quyền đã tồn tại');
    return this.base.createOneBase(req, dto);
  }

  @Override()
  async updateOne(
    @Param('id') id: number,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: RoleEntity,
  ): Promise<RoleEntity> {
    const checkRoleName = await this.service.repo.findOne({
      where: {
        name: dto.name,
        id: Not(id),
      },
    });
    if (checkRoleName)
      throw new BadRequestException('Tên nhóm quyền đã tồn tại');
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<RoleEntity> | RoleEntity[]> {
    return this.base.getManyBase(req);
  }

  @Get('/routes')
  @Auth()
  @ApiOperation({
    summary: 'Danh sách chức năng',
  })
  async routes() {
    const docs = await lastValueFrom(
      this.httpService.get('http://localhost:5005/docs/json'),
    );
    const paths = {};
    Object.keys(docs.data.paths).map((key) => {
      const keys = key.split('/');
      const controller = keys[1];
      Object.keys(docs.data.paths[key]).map((method) => {
        if (
          docs.data.paths[key][method]?.security?.length > 0 &&
          !this.ignoreControllers.includes(controller)
        )
          paths[controller] = {
            ...paths[controller],
            ...{
              [docs.data.paths[key][method].operationId]:
                docs.data.paths[key][method].summary,
            },
          };
      });
    });
    return paths;
  }

  @Post('bulk')
  @Auth()
  @ApiOperation({
    summary: 'Cập nhật nhiều nhóm Quyền',
  })
  @ApiBody({
    type: [RoleEntity],
  })
  async updateMany(@Body() dto: RoleEntity[]) {
    return this.service.updateMany(dto);
  }
}
