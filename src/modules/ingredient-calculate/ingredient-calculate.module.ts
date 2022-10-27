import { Module } from '@nestjs/common';
import { IngredientCalculateService } from './ingredient-calculate.service';
import { IngredientCalculateController } from './ingredient-calculate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientIndexEntity } from '../../entities/ingredient-index.entity';
import { IngredientModule } from '../ingredient/ingredient.module';
import { UserModule } from '../user/user.module';
import { ConfigSystemModule } from '../config-system/config-system.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientIndexEntity]),
    IngredientModule,
    UserModule,
    ConfigSystemModule,
  ],
  controllers: [IngredientCalculateController],
  providers: [IngredientCalculateService],
  exports: [IngredientCalculateService],
})
export class IngredientCalculateModule {}
