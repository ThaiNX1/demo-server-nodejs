import { ConfigSystemService } from './config-system.service';
import { Crud } from '../../decorators/crud.decorator';
import { ConfigEntity } from '../../entities/config.entity';
import { CrudController } from '@nestjsx/crud';
import { Auth } from 'decorators/auth.decorator';

@Crud({
  controller: 'config',
  name: 'Cấu hình',
  model: {
    type: ConfigEntity,
  },
})
@Auth()
export class ConfigSystemController implements CrudController<ConfigEntity> {
  constructor(public readonly service: ConfigSystemService) {}

  get base(): CrudController<ConfigEntity> {
    return this;
  }
}
