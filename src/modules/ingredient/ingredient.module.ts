import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from '../../entities/ingredient.entity';
import { IngredientIndexEntity } from '../../entities/ingredient-index.entity';
import { AnimalEntity } from '../../entities/animal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngredientEntity,
      IngredientIndexEntity,
      AnimalEntity,
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
