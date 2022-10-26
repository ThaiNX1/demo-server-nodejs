import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../entities/order.entity';
import { OrderHistoryEntity } from '../../entities/order-history.entity';
import { OrderProductEntity } from '../../entities/order-product.entity';
import { OrderRevenueEntity } from '../../entities/order-revenue.entity';

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    public repo: Repository<OrderEntity>,
    @InjectRepository(OrderHistoryEntity)
    public orderHistoryRepo: Repository<OrderHistoryEntity>,
    @InjectRepository(OrderProductEntity)
    public orderProductRepo: Repository<OrderProductEntity>,
    @InjectRepository(OrderRevenueEntity)
    public orderRevenueRepo: Repository<OrderRevenueEntity>,
  ) {
    super(repo);
  }
}
