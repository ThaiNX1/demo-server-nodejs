import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../entities/user.entity';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mật khẩu cũ',
    required: true,
  })
  oldPassword: string;

  @ApiProperty({
    description: 'Mật khẩu mới',
    required: true,
  })
  newPassword: string;
}

export class UpdatePaymentInfoDto extends PickType(UserEntity, [
  'bankAccountName',
  'bankNumber',
  'bankBranch',
]) {}
