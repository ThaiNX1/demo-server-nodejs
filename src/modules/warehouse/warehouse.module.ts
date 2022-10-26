import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseEntity } from '../../entities/warehouse.entity';
import { WarehouseHistoryEntity } from '../../entities/warehouse-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WarehouseEntity, WarehouseHistoryEntity]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService],
  exports: [WarehouseService],
})
export class WarehouseModule {}
