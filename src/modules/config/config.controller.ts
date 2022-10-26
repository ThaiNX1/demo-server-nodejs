import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { ConfigEntity } from 'entities/config.entity';
import { ConfigService } from './config.service';

@Crud({
  controller: 'config',
  name: 'Cấu hình',
  model: {
    type: ConfigEntity,
  },
})
export class ConfigController implements CrudController<ConfigEntity> {
  constructor(public readonly service: ConfigService) {}
}
