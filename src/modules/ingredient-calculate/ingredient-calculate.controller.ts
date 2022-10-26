import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IngredientCalculateService } from './ingredient-calculate.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CalculateResponseDto } from './dto/calculate-response.dto';
import { CalculateRequestDto } from './dto/calculate-request.dto';

@ApiTags('Ingredient Calculate')
@Controller('ingredientCalculate')
export class IngredientCalculateController {
  constructor(
    private readonly ingredientCalculateService: IngredientCalculateService,
  ) {}

  @Post('/nutrition-calculate')
  @ApiOperation({
    summary: 'Tính thành phần dinh dưỡng',
  })
  @ApiOkResponse({
    type: CalculateResponseDto,
  })
  @ApiBody({
    description: 'Thông tin nguyên liệu',
    type: CalculateRequestDto,
  })
  @HttpCode(200)
  // @Auth()
  async calculateNutrition(
    @Body() dto: CalculateRequestDto,
    // @User() user: UserEntity,
  ): Promise<CalculateResponseDto> {
    return this.ingredientCalculateService.calculateNutrition(dto);
  }
}
