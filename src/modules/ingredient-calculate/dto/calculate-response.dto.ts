import { ApiProperty } from '@nestjs/swagger';

export class CalculateItem {
  @ApiProperty({
    description: 'Mã',
  })
  code?: string;
  @ApiProperty({
    description: 'Tên',
  })
  name?: string;
  @ApiProperty({
    description: 'Giá trị',
  })
  value?: number;
  @ApiProperty({
    description: 'Đơn vị tính',
  })
  unit?: string;
}

export class CalculateResponseDto {
  @ApiProperty({
    description: 'Vật chất khô',
  })
  DryMatter?: CalculateItem;

  @ApiProperty({
    description: 'ME, Heo/ME, Gia cẩm',
  })
  ME?: CalculateItem;

  @ApiProperty({
    description: 'Đạm thô',
  })
  CrudeProtein?: CalculateItem;

  @ApiProperty({
    description: 'Béo',
  })
  Fat?: CalculateItem;

  @ApiProperty({
    description: 'Xơ thô',
  })
  CrudeFiber?: CalculateItem;

  @ApiProperty({
    description: 'Lysine, Total',
  })
  LysineTotal?: CalculateItem;

  @ApiProperty({
    description: 'Methionine, Total',
  })
  MethionineTotal?: CalculateItem;

  @ApiProperty({
    description: 'Met + Cys, Total',
  })
  MetCysTotal?: CalculateItem;

  @ApiProperty({
    description: 'Threonine, Total',
  })
  ThreonineTotal?: CalculateItem;

  @ApiProperty({
    description: 'Tryptophan, Total',
  })
  TryptophanTotal?: CalculateItem;

  @ApiProperty({
    description: 'Lactose',
  })
  Lactose?: CalculateItem;

  @ApiProperty({
    description: 'LYS, TH Heo/LYS, TH Gia cầm',
  })
  LYS_TH?: CalculateItem;

  @ApiProperty({
    description: 'MET, TH Heo/MET, TH Gia cầm',
  })
  MET_TH?: CalculateItem;

  @ApiProperty({
    description: 'M+C, TH Heo/M+C, TH Gia cầm',
  })
  MC_TH?: CalculateItem;

  @ApiProperty({
    description: 'THR, TH Heo/THR, TH Gia cầm',
  })
  THR_TH?: CalculateItem;

  @ApiProperty({
    description: 'TRP, TH Heo/TRP, TH Gia cầm',
  })
  TRP_TH?: CalculateItem;

  @ApiProperty({
    description: 'Calcium (Ca)',
  })
  Calcium?: CalculateItem;

  @ApiProperty({
    description: 'Phosphorus, Total',
  })
  PhosphorusTotal?: CalculateItem;

  @ApiProperty({
    description: 'Phosphorus, availability',
  })
  PhosphorusAvail?: CalculateItem;

  @ApiProperty({
    description: 'Sodium (Na)',
  })
  Sodium?: CalculateItem;

  @ApiProperty({
    description: 'Chloride (Cl)',
  })
  Chloride?: CalculateItem;

  @ApiProperty({
    description: 'Muối (NaCl)',
  })
  Salt?: CalculateItem;

  @ApiProperty({
    description: 'Linoleic Acid',
  })
  LinoleicAcid?: CalculateItem;
}
