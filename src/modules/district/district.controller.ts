import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { DistrictEntity } from 'entities/district.entity';
import { DistrictService } from './district.service';
import { Auth } from 'decorators/auth.decorator';

@Crud({
  controller: 'districts',
  name: 'Quận/huyện',
  model: {
    type: DistrictEntity,
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
export class DistrictController implements CrudController<DistrictEntity> {
  constructor(public readonly service: DistrictService) {}
}
