import { ApiProperty } from '@nestjs/swagger';
import { ProvinceEntity } from 'entities/province.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JoinColumn } from 'typeorm';

@Entity('nutri_district')
export class DistrictEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Quận/huyện',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Mã Quận/huyện',
  })
  @Column()
  code: string;

  @ApiProperty({
    description: 'Mã tên Quận/huyện',
  })
  @Column()
  codeName: string;

  @ApiProperty({
    description: 'Loại',
  })
  @Column()
  divisionType: string;

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
}
