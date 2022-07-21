import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DistrictEntity } from 'entities/district.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ProvinceType {
  CITY = 'city',
  PROVINCE = 'province',
}

@Entity('province')
export class ProvinceEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Tỉnh/thành',
  })
  @Column()
  name: string;

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

  @ApiProperty({
    description: 'Loại Tỉnh/thành',
    enum: ProvinceType,
    type: 'enum',
  })
  @Column({
    type: 'enum',
    enum: ProvinceType,
    default: ProvinceType.PROVINCE,
  })
  type: ProvinceType;

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];

  @ApiProperty({
    description: 'Sắp xếp',
    enum: ProvinceType,
  })
  @Column({
    nullable: true,
    default: 1,
    type: Number,
  })
  position: number;
}
