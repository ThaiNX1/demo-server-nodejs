import { ApiProperty } from '@nestjs/swagger';

export class RegisterOtpDto {
  @ApiProperty({
    description: 'Số điện thoại nhận sms otp',
  })
  tel: string;

  @ApiProperty({
    description: 'Firebase Token',
  })
  idToken: string;
}
