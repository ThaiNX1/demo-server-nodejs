import { BaseEntity } from "./base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../enums";

@Entity("order_revenue")
export class OrderRevenueEntity extends BaseEntity {
  @Column()
  @ApiProperty({
    description: "Trạng thái đơn hàng",
    required: true,
    type: OrderStatus
  })
  status: OrderStatus;

  @Column()
  @ApiProperty({
    description: "Doanh thu đơn hàng",
    required: true
  })
  revenue: number | 0;

  @Column()
  @ApiProperty({
    description: "Tháng tính doanh thu"
  })
  month?: Date;
}
