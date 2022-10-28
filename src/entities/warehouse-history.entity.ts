import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { WarehouseHistoryType } from '../enums';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity('nutri_warehouse_history')
export class WarehouseHistoryEntity extends BaseEntity {
  @Column()
  @ApiProperty({
    description: 'Id sản phẩm',
    required: true,
    type: Number,
  })
  productId: number;

  @ManyToOne(() => ProductEntity, (prod) => prod.id)
  product: ProductEntity;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Id biến tể',
    required: false,
    type: Number,
  })
  variantId?: number;

  @ManyToOne(() => ProductVariantEntity, (variant) => variant.id)
  variant: ProductVariantEntity;

  @Column()
  @ApiProperty({
    description: 'Loại thao tác',
    required: true,
    type: 'enum',
    enum: WarehouseHistoryType,
  })
  type: WarehouseHistoryType;

  @Column()
  @ApiProperty({
    description: 'Số lượng',
    required: true,
    type: Number,
  })
  quantity: number;
}
