import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    description: 'Tên file đã upload',
    type: [String],
  })
  files: string[];
}
