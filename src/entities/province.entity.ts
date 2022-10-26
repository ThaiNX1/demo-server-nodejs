import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DistrictEntity } from 'entities/district.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('province')
export class ProvinceEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên Tỉnh/thành',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Mã tỉnh/tp',
  })
  @Column()
  code: string;

  @ApiProperty({
    description: 'Mã tên tỉnh/tp',
  })
  @Column()
  codeName: string;

  @ApiProperty({
    description: 'Loại',
  })
  @Column()
  divisionType: string;

  @ApiProperty({
    description: 'Mã điện thoại',
  })
  @Column()
  phoneCode: string;

  @OneToMany(() => DistrictEntity, (district) => district.province)
  districts: DistrictEntity[];

}
