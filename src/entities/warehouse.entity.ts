import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums';
import { WardEntity } from './ward.entity';
import { ProductEntity } from './product.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity('nutri_warehouse')
export class WarehouseEntity extends BaseEntity {
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
    description: 'Số lượng tồn kho',
    required: true,
  })
  quantity: number | 0;

  @Column()
  @ApiProperty({
    description: 'Số lượng tồn tối thiểu',
  })
  minQuantity: number | 0;

  @Column()
  @ApiProperty({
    description: 'Tên kho',
  })
  name: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Sđt kho',
  })
  tel?: string;

  @Column()
  @ApiProperty({ description: 'Id xã/phường' })
  wardId?: number;

  @ManyToOne(() => WardEntity, (ward) => ward.id)
  ward: WardEntity;

  @Column()
  @ApiProperty({ description: 'Địa chỉ cụ thể' })
  address?: string;
}
