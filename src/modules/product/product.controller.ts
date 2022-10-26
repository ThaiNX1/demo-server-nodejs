import { ProductService } from './product.service';
import { Crud } from '../../decorators/crud.decorator';
import { CrudController } from '@nestjsx/crud';
import { ProductEntity } from '../../entities/product.entity';

@Crud({
  name: 'Sản phẩm',
  controller: 'products',
  model: {
    type: ProductEntity,
  },
})
export class ProductController implements CrudController<ProductEntity> {
  constructor(public readonly service: ProductService) {}

  get base(): CrudController<ProductEntity> {
    return this;
  }
}
