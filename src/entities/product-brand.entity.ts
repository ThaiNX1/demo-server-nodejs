import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

@Entity('nutri_product_brand')
export class ProductBrandEntity extends BaseEntity {
  @Column()
  @ApiProperty({
    description: 'Mã thương hiệu',
  })
  code: string;

  @Column()
  @ApiProperty({
    description: 'Ảnh thương hiệu',
  })
  image?: string;

  @Column()
  @ApiProperty({
    description: 'Tên thương hiệu',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Mô tả thương hiệu',
  })
  description: string;

  @OneToMany(() => ProductEntity, ({ productCategory }) => productCategory)
  products: ProductEntity[];
}
