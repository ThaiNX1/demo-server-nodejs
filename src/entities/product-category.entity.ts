import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

@Entity('nutri_product_category')
@Tree('materialized-path')
export class ProductCategoryEntity extends BaseEntity {
  @Column()
  @ApiProperty({
    description: 'Mã danh mục',
  })
  code: string;

  @Column()
  @ApiProperty({
    description: 'Ảnh danh mục',
  })
  image?: string;

  @Column()
  @ApiProperty({
    description: 'Tên danh mục',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Mô tả danh mục',
  })
  description: string;

  @ApiProperty({
    description: 'Danh sách cấp dưới ',
    required: false,
    type: [ProductCategoryEntity],
  })
  @TreeChildren()
  childrens?: ProductCategoryEntity[];

  @ApiProperty({ description: 'Danh mục cha', required: false })
  @Column({ nullable: true })
  parentId?: number;

  @ApiProperty({
    description: 'Danh mục cha',
    type: ProductCategoryEntity,
    required: false,
  })
  @TreeParent()
  parent: ProductCategoryEntity;

  @OneToMany(() => ProductEntity, ({ productCategory }) => productCategory)
  products: ProductEntity[];
}
