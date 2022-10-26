import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderEntity } from "./order.entity";
import { ProductVariantEntity } from "./product-variant.entity";

@Entity("order_product")
export class OrderProductEntity extends BaseEntity {
  @ApiProperty({
    description: "Mã đơn hàng"
  })
  @Column()
  orderId?: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  order?: OrderEntity;

  @ApiProperty({
    description: "ID Sản phẩm"
  })
  @Column()
  productId?: number;

  @ApiProperty({
    description: "ID biến thể"
  })
  @Column({
    nullable: true
  })
  variantId?: number;

  @ApiProperty({
    description: "ID biến thể",
    type: ProductVariantEntity
  })
  @ManyToOne(() => ProductVariantEntity, (variant) => variant.id)
  variant?: ProductVariantEntity;

  @ApiProperty({
    description: "Số lượng",
    required: false
  })
  @Column({
    default: 0
  })
  quantity?: number;

  @ApiProperty({
    description: "Giảm giá",
    required: false
  })
  @Column({
    default: 0
  })
  discount?: number;
}
