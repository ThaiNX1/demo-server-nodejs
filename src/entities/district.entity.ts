import { ApiProperty } from '@nestjs/swagger';
import { ProvinceEntity } from 'entities/province.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JoinColumn } from 'typeorm';

export enum DistrictType {
  DISTRICT = 'district', //Huyện
  TOWN = 'town', //Quận
  TOWNSHIP = 'township', //Thị xã
  CITY = 'city', //Thành phố
}

@Entity('district')
export class DistrictEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Quận/huyện',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Loại Quận/huyện',
    enum: DistrictType,
  })
  @Column({
    type: 'enum',
    enum: DistrictType,
    default: DistrictType.DISTRICT,
  })
  type: DistrictType;

  @ApiProperty({
    description: 'ID Tỉnh/thành',
  })
  @Column()
  provinceId: number;

  @ApiProperty({
    description: 'Thông tin Tỉnh/thành',
    type: ProvinceEntity,
    required: false,
  })
  @ManyToOne(() => ProvinceEntity, (province) => province.id)
  province?: ProvinceEntity;

  @ApiProperty({
    description: 'ID Giao hàng nhanh',
    required: false,
  })
  @Column({ nullable: true })
  ghnId: number;

  @ApiProperty({
    description: 'ID Viettel Post',
    required: false,
  })
  @Column({ nullable: true })
  vtpId: number;

  @ApiProperty({
    description: 'ID Viettel Post',
    required: false,
    type: [String],
  })
  @Column({ nullable: true, type: 'jsonb' })
  nameExtensions: string[];
}
