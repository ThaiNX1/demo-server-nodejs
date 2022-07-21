import { ApiProperty } from '@nestjs/swagger';

export class UpdateAvatarDto {
  @ApiProperty({ description: 'Ảnh đại diện', required: true })
  avatar: string;
}
