import { IngredientService } from './ingredient.service';
import { Crud } from '../../decorators/crud.decorator';
import { Auth } from '../../decorators/auth.decorator';
import { IngredientEntity } from '../../entities/ingredient.entity';
import { CrudController } from '@nestjsx/crud';

@Crud({
  name: 'Nguyên liệu',
  controller: 'ingredient',
  model: {
    type: IngredientEntity,
  },
})
@Auth()
export class IngredientController implements CrudController<IngredientEntity> {
  constructor(public readonly service: IngredientService) {}

  get base(): CrudController<IngredientEntity> {
    return this;
  }
}
