import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'entities/user.entity';

/** Dữ liệu trả về */
export class UserBonusResponse {
  @ApiProperty({
    description: 'Thông tin F1',
    type: UserEntity,
  })
  user?: UserEntity;

  @ApiProperty({
    description: 'Hoa hồng từ doanh thu F1',
    type: Number,
  })
  totalReferralBonus?: Number | 0;

  @ApiProperty({
    description: 'Hoa hồng từ đơn đầu tiên doanh thu F1',
    type: Number,
  })
  totalFirstOrderBonus?: Number | 0;
}

export class UserBonus {
  @ApiProperty({
    description: 'Hoa hồng từ doanh thu F1',
    type: Number,
  })
  totalReferralBonus?: Number | 0;

  @ApiProperty({
    description: 'Hoa hồng từ đơn đầu tiên doanh thu F1',
    type: Number,
  })
  totalFirstOrderBonus?: Number | 0;

  @ApiProperty({
    description: 'Danh sách hoa hồng từ doanh thu F1',
    type: [UserBonusResponse],
  })
  userBonus: UserBonusResponse[];
}

/** Tìm kiếm */
export class UserBonusFilterDto {
  @ApiProperty({
    description: 'Ngày bắt đầu',
    type: Date,
    required: false,
    default: new Date(
      new Date(new Date().setDate(new Date().getDate() - 7)).setHours(0, 0, 0),
    ),
  })
  fromDate: Date;

  @ApiProperty({
    description: 'Ngày kết thúc',
    type: Date,
    required: false,
    default: new Date(new Date().setHours(0, 0, 0)),
  })
  toDate: Date;

  @ApiProperty({
    description: 'Số lượng record/trang',
    type: Number,
    required: true,
    default: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Trang',
    type: Number,
    required: true,
    default: 1,
  })
  page: number;
}
