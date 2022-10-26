import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalType } from '../enums';

@Entity('animal')
export class AnimalEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'Tên' })
  fullName: string;

  @Column()
  @ApiProperty({ description: 'Mã động vật' })
  code: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: AnimalType,
    default: AnimalType.Cattle,
  })
  @ApiProperty({
    description: 'Loại động vật',
    enum: AnimalType,
  })
  type?: AnimalType;
}
