import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum LoginType {
  APP = 'app',
  WEB = 'web',
}

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'Số điện thoại',
  })
  tel: string;

  @IsString()
  @ApiProperty({
    description: 'Mật khẩu',
  })
  password: string;

  @ApiProperty({
    description: 'Loại đăng nhập (App/Web)',
    type: 'enum',
    enum: LoginType,
    default: LoginType.WEB,
    required: false,
  })
  type?: LoginType;
}
