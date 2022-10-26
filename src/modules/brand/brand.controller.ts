import { BrandService } from './brand.service';
import { Crud } from '../../decorators/crud.decorator';
import { Auth } from '../../decorators/auth.decorator';
import { CrudController } from '@nestjsx/crud';
import { ProductBrandEntity } from '../../entities/product-brand.entity';

@Crud({
  name: 'Thương hiệu',
  controller: 'brands',
  model: {
    type: ProductBrandEntity,
  },
})
@Auth()
export class BrandController implements CrudController<ProductBrandEntity> {
  constructor(public readonly service: BrandService) {}

  get base(): CrudController<ProductBrandEntity> {
    return this;
  }
}
