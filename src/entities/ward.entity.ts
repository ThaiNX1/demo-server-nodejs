import { ApiProperty } from '@nestjs/swagger';
import { DistrictEntity } from 'entities/district.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('ward')
export class WardEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Phường/Xã',
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
}
