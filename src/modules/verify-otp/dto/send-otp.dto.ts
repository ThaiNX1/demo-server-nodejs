import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Không đúng định dạng số điện thoại',
  })
  @MaxLength(10, {
    message: 'Không đúng định dạng số điện thoại',
  })
  @ApiProperty({
    description: 'Số điện thoại nhận sms otp',
    required: true,
  })
  tel: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recaptcha Token',
    required: true,
  })
  recaptchaToken: string;
}
