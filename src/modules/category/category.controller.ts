import { CategoryService } from './category.service';
import { CrudController } from '@nestjsx/crud';
import { ProductCategoryEntity } from '../../entities/product-category.entity';
import { Crud } from '../../decorators/crud.decorator';
import { Auth } from '../../decorators/auth.decorator';

@Crud({
  name: 'Danh mục',
  controller: 'categories',
  model: {
    type: ProductCategoryEntity,
  },
})
@Auth()
export class CategoryController
  implements CrudController<ProductCategoryEntity>
{
  constructor(public readonly service: CategoryService) {}

  get base(): CrudController<ProductCategoryEntity> {
    return this;
  }
}
