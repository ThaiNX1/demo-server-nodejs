import { Module } from '@nestjs/common';
import { CdnService } from './cdn.service';
import { CdnController } from './cdn.controller';
import { ConfigModule } from '@nestjs/config';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [ConfigModule, IngredientModule],
  controllers: [CdnController],
  providers: [CdnService],
})
export class CdnModule {}
