import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { PermissionEntity } from 'entities/permission.entity';
import { PermissionService } from './permission.service';
import { Auth } from 'decorators/auth.decorator';

@Crud({
  controller: 'permissions',
  name: 'Permissions',
  model: {
    type: PermissionEntity,
  },
})
@Auth()
export class PermissionController implements CrudController<PermissionEntity> {
  constructor(public readonly service: PermissionService) {}
}
