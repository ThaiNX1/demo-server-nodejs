import { ApiProperty } from '@nestjs/swagger';

export class SendVerifyOtpDto {
  @ApiProperty({
    description: 'Số điện thoại nhận sms otp',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Recaptcha Token',
    required: true,
  })
  recaptchaToken: string;
}