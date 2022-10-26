import { WarehouseService } from './warehouse.service';
import { Crud } from '../../decorators/crud.decorator';
import { WarehouseEntity } from '../../entities/warehouse.entity';
import { CrudController } from '@nestjsx/crud';

@Crud({
  name: 'Kho',
  controller: 'warehouses',
  model: {
    type: WarehouseEntity,
  },
})
export class WarehouseController implements CrudController<WarehouseEntity> {
  constructor(public readonly service: WarehouseService) {}

  get base(): CrudController<WarehouseEntity> {
    return this;
  }
}
