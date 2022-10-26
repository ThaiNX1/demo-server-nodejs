import { WardService } from 'modules/ward/ward.service';
import { CrudController } from '@nestjsx/crud';
import { WardEntity } from 'entities/ward.entity';
import { Crud } from 'decorators/crud.decorator';
import { Auth } from 'decorators/auth.decorator';

@Crud({
  name: 'Xã/phường',
  controller: 'wards',
  model: {
    type: WardEntity,
  },
  query: {
    join: {
      district: {},
      'district.province': {},
    },
  },
  routes: {
    exclude: ['deleteOneBase'],
    createOneBase: {
      decorators: [Auth()],
    },
    updateOneBase: {
      decorators: [Auth()],
    },
  },
})
export class WardController implements CrudController<WardEntity> {
  constructor(public readonly service: WardService) {}
}
