import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";

@Entity("product_variant")
export class ProductVariantEntity extends BaseEntity {
  @ApiProperty({
    description: "Id sản phẩm",
    required: false
  })
  @Column()
  productId?: number;

  @ApiProperty({
    description: "Sản phẩm",
    required: false,
    type: () => ProductEntity
  })
  @ManyToOne(() => ProductEntity, (prouduct) => prouduct.variants)
  product: ProductEntity;

  @ApiProperty({
    description: "Tên biến thể \"Thuộc tính 1,Thuộc tính 2\""
  })
  @Column()
  name: string;

  @ApiProperty({
    description: "Hình ảnh biến thể",
    required: false,
    type: [String]
  })
  @Column({
    type: "jsonb",
    default: []
  })
  images?: string[];

  @ApiProperty({
    description: "Giá biến thể sản phẩm"
  })
  @Column({ default: 0 })
  price?: number;

  @ApiProperty({
    description: "Mã Sku",
    required: false
  })
  @Column({ nullable: true })
  SKU?: string;

  @IsNumber()
  @ApiProperty({ description: "Giá trước khi giảm" })
  @Column({ default: 0 })
  priceBeforeDiscount?: number;
}
