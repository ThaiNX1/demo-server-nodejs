import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletDto {
  @ApiProperty({ description: 'Số tiền', required: false })
  amount?: number;
}
