import { ApiProperty } from '@nestjs/swagger';
import { DistrictEntity } from 'entities/district.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum WardType {
  WARD = 'ward', //Phường
  COMMUNE = 'commune', //Xã
  TOWN = 'town', //Thị trấn
}

@Entity('ward')
export class WardEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Phường/Xã',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Loại Phường/Xã',
    enum: WardType,
  })
  @Column({
    type: 'enum',
    enum: WardType,
    default: WardType.COMMUNE,
  })
  type: WardType;

  @ApiProperty({
    description: 'ID của Quận/Huyện',
  })
  @Column()
  districtId: number;

  @ApiProperty({
    description: 'Thông tin Quận/huyện',
    type: DistrictEntity,
    required: false,
  })
  @ManyToOne(() => DistrictEntity, (ward) => ward.id)
  district?: DistrictEntity;

  @ApiProperty({
    description: 'Code Giao hàng nhanh',
    required: false,
  })
  @Column({ nullable: true })
  ghnCode: string;

  @ApiProperty({
    description: 'ID Viettel Post',
    required: false,
  })
  @Column({ nullable: true })
  vtpId: number;
}
