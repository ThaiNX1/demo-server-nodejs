import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../enums';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductBrandEntity } from './product-brand.entity';
import { IsNumber } from 'class-validator';
import { ProductVariantEntity } from './product-variant.entity';

@Entity('nutri_product')
export class ProductEntity extends BaseEntity {
  @Column()
  @ApiProperty({
    description: 'Mã sản phẩm',
  })
  SKU: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  @ApiProperty({
    description: 'Ảnh sản phẩm',
  })
  images?: string[];

  @Column()
  @ApiProperty({
    description: 'Tên sản phẩm',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Mô tả sản phẩm',
  })
  description: string;

  @ApiProperty({ description: 'Giá sản phẩm/Giá thấp nhất của sản phẩm' })
  @Column({ default: 0 })
  price?: number;

  @IsNumber()
  @ApiProperty({ description: 'Giá trước khi giảm' })
  @Column({ default: 0 })
  priceBeforeDiscount?: number;

  @ApiProperty({ description: 'Khối lượng (ĐVT: gram)' })
  @Column({ default: 0 })
  weight?: number;

  @ApiProperty({ description: 'Chiều cao', required: false })
  @Column({ default: 0 })
  height?: number;

  @ApiProperty({ description: 'Chiều dài', required: false })
  @Column({ default: 0 })
  length?: number;

  @ApiProperty({ description: 'Chiều rộng', required: false })
  @Column({ default: 0 })
  width?: number;

  @ApiProperty({ description: 'Id Danh mục sản phẩm' })
  @Column({ nullable: true })
  productCategoryId?: number;

  @ApiProperty({ description: 'Id Thương hiệu sản phẩm' })
  @Column({ nullable: true })
  productBrandId?: number;

  @ApiProperty({ description: 'Trạng thái', enum: ProductStatus })
  @Column({
    nullable: true,
    default: ProductStatus.ACTIVE,
    type: 'enum',
    enum: ProductStatus,
  })
  status?: ProductStatus;

  @ApiProperty({ description: 'Tag sản phẩm', required: false })
  @Column({ nullable: true })
  tag?: string;

  @ApiProperty({ description: 'Danh mục', type: () => ProductCategoryEntity })
  @ManyToOne(() => ProductCategoryEntity, ({ products }) => products)
  productCategory?: ProductCategoryEntity;

  @ApiProperty({ description: 'Thương hiệu', type: () => ProductBrandEntity })
  @ManyToOne(() => ProductBrandEntity, ({ products }) => products)
  productBrand?: ProductBrandEntity;

  @ApiProperty({
    description: 'Biến thể',
    required: false,
    type: () => [ProductVariantEntity],
  })
  @OneToMany(() => ProductVariantEntity, (variant) => variant.product)
  variants: ProductVariantEntity[];
}
