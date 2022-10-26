import { ApiProperty } from '@nestjs/swagger';
import { ConfigType } from "../../../enums";
export class ConfigDto {
  @ApiProperty({
    description:
      'Id đối tác (null: Cấu hình cho sàn; #null: Cấu hình cho đối tác)',
  })
  merchantId?: number;

  @ApiProperty({ description: 'Loại cấu hình' })
  key?: ConfigType;

  @ApiProperty({ description: 'Ngày bắt đầu được áp dụng' })
  startDate?: Date;

  @ApiProperty({ description: 'Ngày kết thúc áp dụng' })
  endDate?: Date;

  @ApiProperty({ description: 'Tên cấu hình' })
  name?: string;

  @ApiProperty({ description: 'Các thuộc tính cấu hình' })
  value?: any;

  @ApiProperty({ description: 'Ghi chú cấu hình' })
  note?: string;
}
