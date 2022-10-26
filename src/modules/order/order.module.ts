import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderHistoryEntity } from '../../entities/order-history.entity';
import { OrderProductEntity } from '../../entities/order-product.entity';
import { OrderRevenueEntity } from '../../entities/order-revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderHistoryEntity,
      OrderProductEntity,
      OrderRevenueEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
