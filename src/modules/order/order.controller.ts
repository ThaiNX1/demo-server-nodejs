import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { Crud } from '../../decorators/crud.decorator';
import { ProductEntity } from '../../entities/product.entity';
import { OrderEntity } from '../../entities/order.entity';
import { CrudController } from '@nestjsx/crud';
import { ProductService } from '../product/product.service';

@Crud({
  name: 'Đơn hàng',
  controller: 'orders',
  model: {
    type: OrderEntity,
  },
})
export class OrderController implements CrudController<OrderEntity> {
  constructor(public readonly service: OrderService) {}

  get base(): CrudController<OrderEntity> {
    return this;
  }
}
