import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserEntity } from 'entities/user.entity';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDto extends PickType(UserEntity, [
  'fullName',
  'email',
  'tel',
  'wardId',
  'dob',
  'gender',
  'password',
]) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Mã người giới thiệu',
    type: String,
    required: false,
  })
  referralCode?: string;
}
