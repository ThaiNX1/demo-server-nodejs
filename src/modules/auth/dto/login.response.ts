import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @IsString()
  @ApiProperty({
    description: 'Access token',
  })
  token: string;
}
