import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class SendOtpForgotPasswordDto {
  @ApiProperty({
    description: 'Số điện thoại reset mật khẩu',
    required: true,
  })
  @MinLength(10, {
    message: 'Không đúng định dạng số điện thoại',
  })
  @MaxLength(10, {
    message: 'Không đúng định dạng số điện thoại',
  })
  tel: string;

  @ApiProperty({
    description: 'Recaptcha Token',
    required: true,
  })
  recaptchaToken: string;
}
