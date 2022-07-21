import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Firebase Token',
  })
  idToken: string;

  @ApiProperty({
    description: 'Số điện thoại',
  })
  tel: string;
}
