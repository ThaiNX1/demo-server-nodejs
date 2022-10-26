import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AnimalType } from '../enums';

@Entity('ingredient-index')
export class IngredientIndexEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'Tên nguyên liệu' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Mã nguyên liệu' })
  code: string;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'weight' })
  weight?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Dry Matter' })
  DryMatter?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'ME Poultry' })
  MEPoultry?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'ME Swine' })
  MESwine?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Crude Protein' })
  CrudeProtein?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Crude Fat' })
  CrudeFat?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Crude Fiber' })
  CrudeFiber?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Lysine' })
  Lysine?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Methionine' })
  Methionine?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Met + Cys' })
  MetCys?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Threonine' })
  Threonine?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Tryptophan' })
  Tryptophan?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Lactose' })
  Lactose?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Ca/P' })
  CaP?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'LYS, dig POULTRY' })
  LYSdigPOULTRY?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'MET, dig POULTRY' })
  METdigPOULTRY?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'M+C, dig POULTRY' })
  MCdigPOULTRY?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'THR, dig POULTRY' })
  THRdigPOULTRY?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'TRP, dig POULTRY' })
  TRPdigPOULTRY?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'LYS, dig SWINE' })
  LYSdigSWINE?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'MET, dig SWINE' })
  METdigSWINE?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'M+C, dig SWINE' })
  MCdigSWINE?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'THR, dig SWINE' })
  THRdigSWINE?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'TRP, dig SWINE' })
  TRPdigSWINE?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Calcium (Ca)' })
  Calcium?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Phosphorus, Total' })
  PhosphorusTotal?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Phosphorus, avail' })
  PhosphorusAvail?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Sodium (Na)' })
  Sodium?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Chloride (Cl)' })
  Chloride?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Salt (NaCl)' })
  Salt?: number;

  @Column({
    type: 'float',
  })
  @ApiProperty({ description: 'Linoleic Acid' })
  LinoleicAcid?: number;
}
