import { ApiProperty } from '@nestjs/swagger';
import {
  ConfigType,
  AmountCollaboratorCommission,
  ConfigMerchantCommission,
  ReferralCommission,
} from 'entities/config.entity';

export class ConfigDto {
  @ApiProperty({
    description:
      'Id đối tác (null: Cấu hình cho sàn; #null: Cấu hình cho đối tác)',
  })
  merchantId?: number;

  @ApiProperty({ description: 'Loại hoa hồng/thưởng' })
  key?: ConfigType;

  @ApiProperty({ description: 'Ngày bắt đầu được áp dụng' })
  startDate?: Date;

  @ApiProperty({ description: 'Ngày kết thúc áp dụng' })
  endDate?: Date;

  @ApiProperty({ description: 'Cấu hình thưởng giới thiệu cho sàn' })
  referralCommission?: ReferralCommission;

  @ApiProperty({ description: 'Cấu hình thưởng theo số lượng CTV cho sàn' })
  amountCollaboratorCommission?: AmountCollaboratorCommission[];

  @ApiProperty({ description: 'Cấu hình cho đối tác' })
  merchantCommission?: ConfigMerchantCommission[];

  @ApiProperty({ description: 'Tên cấu hình' })
  name?: string;

  @ApiProperty({ description: 'Các thuộc tính cấu hình' })
  value?: any;

  @ApiProperty({ description: 'Ghi chú cấu hình' })
  note?: string;
}
