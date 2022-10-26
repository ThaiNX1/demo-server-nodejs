import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { OrderStatus } from "../enums";
import { OrderEntity } from "./order.entity";

@Entity('order_history')
export class OrderHistoryEntity extends BaseEntity {
  @ApiProperty({
    description: 'ID Đơn hàng',
    type: Number,
  })
  @Column()
  orderId: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  order: OrderEntity;

  @ApiProperty({
    description: 'Trạng thái',
    enum: OrderStatus,
  })
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: OrderStatus;
}
