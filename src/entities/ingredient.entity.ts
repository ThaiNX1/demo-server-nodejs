import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ingredient')
export class IngredientEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'Tên nguyên liệu' })
  name: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({ description: 'Tên khác nguyên liệu', required: false })
  otherName: string;

  @Column()
  @ApiProperty({ description: 'Mã nguyên liệu' })
  code: string;
}
