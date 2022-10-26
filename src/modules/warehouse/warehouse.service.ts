import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseEntity } from '../../entities/warehouse.entity';
import { WarehouseHistoryEntity } from '../../entities/warehouse-history.entity';

@Injectable()
export class WarehouseService extends TypeOrmCrudService<WarehouseEntity> {
  constructor(
    @InjectRepository(WarehouseEntity)
    public repo: Repository<WarehouseEntity>,
    @InjectRepository(WarehouseHistoryEntity)
    public warehouseHistoryRepo: Repository<WarehouseHistoryEntity>,
  ) {
    super(repo);
  }
}
