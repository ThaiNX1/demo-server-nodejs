import { ApiProperty } from '@nestjs/swagger';
import { AnimalType } from '../../../enums';

export class IngredientRequest {
  @ApiProperty({
    description: 'Mã nguyên liệu',
  })
  code: string;

  @ApiProperty({
    description: 'Khối lượng nguyên liệu',
  })
  weight: number;

  @ApiProperty({
    description: 'Đơn giá nguyên liệu',
  })
  price: number;
}

export class CalculateRequestDto {
  @ApiProperty({
    description: 'Danh sách nguyên liệu',
    type: [IngredientRequest],
  })
  ingredients: IngredientRequest[];

  @ApiProperty({
    description: 'Loại động vật',
    enum: AnimalType,
  })
  animalType: AnimalType;
}
