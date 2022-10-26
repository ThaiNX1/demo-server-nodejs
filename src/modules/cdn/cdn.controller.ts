import { Controller, Post, Req } from '@nestjs/common';
import { CdnService } from './cdn.service';
import { FastifyRequest } from 'fastify';
import { UploadResponseDto } from 'modules/cdn/dto/upload-response.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'decorators/auth.decorator';
import { IngredientService } from '../ingredient/ingredient.service';

@ApiTags('CDN')
@Controller('cdn')
// @Auth()
export class CdnController {
  constructor(
    private readonly service: CdnService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Post('/upload')
  @ApiOperation({
    summary: 'Upload media',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFile(@Req() req: FastifyRequest): Promise<UploadResponseDto> {
    return await this.service.uploadFile(req);
  }

  @Post('/upload-ingredient-index')
  @ApiOperation({
    summary: 'Upload ingredient index',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadIngredientIndex(@Req() req: FastifyRequest): Promise<any> {
    return await this.ingredientService.uploadIngredientIndex(req);
  }

  @Post('/upload-ingredient')
  @ApiOperation({
    summary: 'Upload ingredient',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadIngredient(@Req() req: FastifyRequest): Promise<any> {
    return await this.ingredientService.uploadIngredient(req);
  }
}
