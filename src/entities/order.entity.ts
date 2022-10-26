import { ApiProperty } from "@nestjs/swagger";
import { OrderPaymentType, OrderStatus } from "enums";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { WardEntity } from "./ward.entity";

@Entity("order")
export class OrderEntity extends BaseEntity {
  @ApiProperty({
    description: "Mã đơn hàng",
    type: String
  })
  @Column({
    nullable: true
  })
  code?: string;

  @ApiProperty({
    description: "Trạng thái đơn hàng",
    enum: OrderStatus
  })
  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.CREATED
  })
  status?: OrderStatus;

  @IsNotEmpty({
    message: "Địa chỉ không được bỏ trống"
  })
  @IsString({ message: " " })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    description: "Địa chỉ"
  })
  @Column()
  shippingAddress: string;

  @ApiProperty({
    description: "ID Phường/Xã",
    required: false
  })
  @Column({
    nullable: true
  })
  wardId?: number;

  @ApiProperty({
    description: "Phường/Xã"
  })
  @ManyToOne(() => WardEntity, (ward) => ward.id)
  ward?: WardEntity;

  @IsNotEmpty({
    message: "Số điện thoại không được bỏ trống"
  })
  @IsNumberString(() => IsNumberString, { message: " " })
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    description: "Số điện thoại"
  })
  @Column()
  tel: string;

  @ApiProperty({
    description: "Phí ship",
    required: false
  })
  @Column({
    nullable: true,
    default: 0
  })
  shippingFee?: number;

  @ApiProperty({
    description: "Tổng tiền",
    required: false
  })
  @Column({
    nullable: true,
    default: 0
  })
  total?: number;

  @ApiProperty({
    description: "Giảm giá",
    required: false
  })
  @Column({
    default: 0
  })
  discount?: number;

  @ApiProperty({
    description: "Phương thức thanh toán",
    required: false,
    enum: OrderPaymentType,
    default: OrderPaymentType.COD
  })
  @Column({
    type: "enum",
    enum: OrderPaymentType,
    default: OrderPaymentType.COD
  })
  paymentType?: OrderPaymentType;

  @ApiProperty({
    description: "Ghi chú của KH/CTV",
    required: false
  })
  @Column({
    nullable: true
  })
  note?: string;

  @ApiProperty({
    description: "Lý do huỷ",
    required: false
  })
  @Column({
    nullable: true
  })
  cancel_reason?: string;
}
