import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class VerifyOtpDto {
  @MinLength(6, {message: "Mã OTP không nhỏ hơn 6 ký tự!"})
  @MaxLength(6, {message: "Mã OTP không lớn hơn 6 ký tự!"})
  @ApiProperty({
    description: 'Otp sms',
  })
  code: string;

  @ApiProperty({
    description: 'Session khi xác thực recaptcha',
    required: true,
  })
  sessionInfo: string;
}