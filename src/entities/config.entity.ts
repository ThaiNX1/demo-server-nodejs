import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ConfigType } from 'enums';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export class ConfigBanner {
  @ApiProperty({ description: 'Link ảnh' })
  url?: string;

  @ApiProperty({ description: 'Nội dung' })
  content?: string;
}
export class ConfigCost {
  @ApiProperty({ description: 'Đơn giá/lần' })
  value?: number;
}

@Entity('config')
export class ConfigEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ConfigType, nullable: true })
  @ApiProperty({
    description: 'Kiểu cấu hình',
    required: true,
    enum: ConfigType,
  })
  key: ConfigType;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Tên cấu hình', required: false })
  name: string;

  @Column({ nullable: true, type: 'jsonb' })
  @ApiProperty({
    description: 'Các thuộc tính cấu hình',
    isArray: true,
    oneOf: [
      { $ref: getSchemaPath(ConfigBanner) },
      { $ref: getSchemaPath(ConfigCost) },
    ],
    type: ConfigBanner,
  })
  value: ConfigBanner[] | ConfigCost | any;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ngày bắt đầu được áp dụng' })
  startDate?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ngày kết thúc áp dụng' })
  endDate?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ghi chú' })
  note?: string;
}
