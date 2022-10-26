import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { WardEntity } from "./ward.entity";

@Entity("customer")
@Unique(["tel"])
export class CustomerEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: "Tên" })
  fullName: string;

  @Column()
  @ApiProperty({ description: "Số điện thoại" })
  tel: string;

  @Column()
  @ApiProperty({ description: "Id xã/phường" })
  wardId?: number;

  @ManyToOne(() => WardEntity, (ward) => ward.id)
  ward: WardEntity;

  @Column()
  @ApiProperty({ description: "Địa chỉ cụ thể" })
  address: string;
}
