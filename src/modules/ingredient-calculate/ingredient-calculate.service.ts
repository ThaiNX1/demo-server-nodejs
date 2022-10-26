import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IngredientService } from '../ingredient/ingredient.service';
import { IngredientIndexEntity } from '../../entities/ingredient-index.entity';
import {
  CalculateRequestDto,
  IngredientRequest,
} from './dto/calculate-request.dto';
import { CalculateResponseDto } from './dto/calculate-response.dto';
import { AnimalType } from '../../enums';

@Injectable()
export class IngredientCalculateService {
  constructor(
    @InjectRepository(IngredientIndexEntity)
    public ingredientIndexRepo: Repository<IngredientIndexEntity>,
    private ingredientService: IngredientService,
  ) {}

  async calculateNutrition(
    dto: CalculateRequestDto,
  ): Promise<CalculateResponseDto> {
    const ingredientCodes = dto.ingredients.map((ing) => {
      return ing.code;
    });
    const ingredientIndexes = await this.ingredientIndexRepo.find({
      where: {
        code: In(ingredientCodes),
      },
    });
    const ingredientWeightTotal =
      dto?.ingredients?.reduce((total, ing) => {
        return total + Number(ing.weight || 0);
      }, 0) || 1;
    const result = new CalculateResponseDto();
    // Vật chất khô
    result.DryMatter = {
      code: 'DryMatter',
      name: 'Vật chất khô',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'DryMatter') /
        ingredientWeightTotal,
    };
    // ME, Heo/ME, Gia cẩm
    result.ME = {
      code: 'ME',
      name: dto.animalType === AnimalType.Cattle ? 'ME, Heo' : 'ME, Gia cẩm',
      unit: 'Kcal/kg',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle ? 'MESwine' : 'MEPoultry',
        ) / ingredientWeightTotal,
    };
    // Đạm thô
    result.CrudeProtein = {
      code: 'CrudeProtein',
      name: 'Đạm thô',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          'CrudeProtein',
        ) / ingredientWeightTotal,
    };
    // Béo
    result.Fat = {
      code: 'CrudeFat',
      name: 'Béo',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'CrudeFat') /
        ingredientWeightTotal,
    };
    // Xơ thô
    result.CrudeFiber = {
      code: 'CrudeFiber',
      name: 'Xơ thô',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'CrudeFiber') /
        ingredientWeightTotal,
    };
    // Lysine, Total
    result.LysineTotal = {
      code: 'CrudeFiber',
      name: 'Lysine, Total',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Lysine') /
        ingredientWeightTotal,
    };
    // Methionine, Total
    result.MethionineTotal = {
      code: 'MethionineTotal',
      name: 'Methionine, Total',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Methionine') /
        ingredientWeightTotal,
    };
    // Met + Cys, Total
    result.MetCysTotal = {
      code: 'MetCysTotal',
      name: 'Met + Cys, Total',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'MetCys') /
        ingredientWeightTotal,
    };
    // Xơ thô
    result.ThreonineTotal = {
      code: 'ThreonineTotal',
      name: 'Threonine, Total',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Threonine') /
        ingredientWeightTotal,
    };
    // Tryptophan, Total
    result.TryptophanTotal = {
      code: 'TryptophanTotal',
      name: 'Tryptophan, Total',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Tryptophan') /
        ingredientWeightTotal,
    };
    // Lactose
    result.Lactose = {
      code: 'Lactose',
      name: 'Lactose',
      unit: '%',
      value:
        dto.animalType === AnimalType.Cattle
          ? this.calculate2array(
              dto.ingredients,
              ingredientIndexes,
              'Lactose',
            ) / ingredientWeightTotal
          : 0,
    };
    // LYS, TH Heo/LYS, TH Gia cầm
    result.LYS_TH = {
      code: 'LYS_TH',
      name:
        dto.animalType === AnimalType.Cattle
          ? 'LYS, TH Heo'
          : 'LYS, TH Gia cầm',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle
            ? 'LYSdigSWINE'
            : 'LYSdigPOULTRY',
        ) / ingredientWeightTotal,
    };
    // MET, TH Heo/MET, TH Gia cầm
    result.MET_TH = {
      code: 'MET_TH',
      name:
        dto.animalType === AnimalType.Cattle
          ? 'MET, TH Heo'
          : 'MET, TH Gia cầm',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle
            ? 'METdigSWINE'
            : 'METdigPOULTRY',
        ) / ingredientWeightTotal,
    };
    // M+C, TH Heo/M+C, TH Gia cầm
    result.MC_TH = {
      code: 'MC_TH',
      name:
        dto.animalType === AnimalType.Cattle
          ? 'M+C, TH Heo'
          : 'M+C, TH Gia cầm',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle ? 'MCdigSWINE' : 'MCdigPOULTRY',
        ) / ingredientWeightTotal,
    };
    // THR, TH Heo/THR, TH Gia cầm
    result.THR_TH = {
      code: 'THR_TH',
      name:
        dto.animalType === AnimalType.Cattle
          ? 'THR, TH Heo'
          : 'THR, TH Gia cầm',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle
            ? 'THRdigSWINE'
            : 'THRdigPOULTRY',
        ) / ingredientWeightTotal,
    };
    // TRP, TH Heo/TRP, TH Gia cầm
    result.TRP_TH = {
      code: 'TRP_TH',
      name:
        dto.animalType === AnimalType.Cattle
          ? 'TRP, TH Heo'
          : 'TRP, TH Gia cầm',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          dto.animalType === AnimalType.Cattle
            ? 'TRPdigSWINE'
            : 'TRPdigPOULTRY',
        ) / ingredientWeightTotal,
    };
    // Calcium (Ca)
    result.Calcium = {
      code: 'Calcium',
      name: 'Calcium (Ca)',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Calcium') /
        ingredientWeightTotal,
    };
    // Phosphorus, Total
    result.PhosphorusTotal = {
      code: 'PhosphorusTotal',
      name: 'Phosphorus, Total',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          'PhosphorusTotal',
        ) / ingredientWeightTotal,
    };
    // Phosphorus, availability
    result.PhosphorusAvail = {
      code: 'PhosphorusAvail',
      name: 'Phosphorus, availability',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          'PhosphorusAvail',
        ) / ingredientWeightTotal,
    };
    // Sodium (Na)
    result.Sodium = {
      code: 'Sodium',
      name: 'Sodium (Na)',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Sodium') /
        ingredientWeightTotal,
    };
    // Chloride (Cl)
    result.Chloride = {
      code: 'Chloride',
      name: 'Chloride (Cl)',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Chloride') /
        ingredientWeightTotal,
    };
    // Muối (NaCl)
    result.Salt = {
      code: 'Salt',
      name: 'Muối (NaCl)',
      unit: '%',
      value:
        this.calculate2array(dto.ingredients, ingredientIndexes, 'Salt') /
        ingredientWeightTotal,
    };
    // LinoleicAcid
    result.LinoleicAcid = {
      code: 'LinoleicAcid',
      name: 'Linoleic Acid',
      unit: '%',
      value:
        this.calculate2array(
          dto.ingredients,
          ingredientIndexes,
          'LinoleicAcid',
        ) / ingredientWeightTotal,
    };
    return result;
  }

  calculate2array(
    ingRequests: IngredientRequest[],
    ingIndexes: IngredientIndexEntity[],
    prop: string,
  ): number {
    const total =
      ingRequests?.reduce((total, ing, index) => {
        const ingIndex = ingIndexes.find((ingI) => ingI.code === ing.code);
        return total + Number(ing.weight * ingIndex?.[prop] || 0);
      }, 0) || 0;
    return total;
  }
}
