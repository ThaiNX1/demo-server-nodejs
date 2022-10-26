import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from '../../entities/ingredient.entity';
import { IngredientIndexEntity } from '../../entities/ingredient-index.entity';
import { FastifyRequest } from 'fastify';
import { Row } from 'exceljs';
import ExcelJS = require('exceljs');

@Injectable()
export class IngredientService extends TypeOrmCrudService<IngredientEntity> {
  constructor(
    @InjectRepository(IngredientEntity)
    public repo: Repository<IngredientEntity>,
    @InjectRepository(IngredientIndexEntity)
    public ingredientIndexRepo: Repository<IngredientIndexEntity>,
    @InjectRepository(IngredientEntity)
    public ingredientRepo: Repository<IngredientEntity>,
  ) {
    super(repo);
  }

  async uploadIngredient(req: FastifyRequest) {
    // @ts-ignore
    const file = await req.file();
    try {
      const ingredientImports: IngredientEntity[] = [];
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.read(file.file).then(async (_workbook) => {
        const worksheet = _workbook.getWorksheet('Sheet1');
        const rows =
          (worksheet.getRows(2, worksheet.lastRow.number) as Row[]) || [];
        for await (const row of rows) {
          ingredientImports.push({
            code: row.getCell(1)?.toString(),
            name: row.getCell(2)?.toString(),
            otherName: row.getCell(3)?.toString(),
          });
        }
        await this.ingredientRepo.save(ingredientImports);
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async uploadIngredientIndex(req: FastifyRequest) {
    // @ts-ignore
    const file = await req.file();
    try {
      const ingredientIndexImports: IngredientIndexEntity[] = [];
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.read(file.file).then(async (_workbook) => {
        const worksheet = _workbook.getWorksheet('Sheet1');
        const rows =
          (worksheet.getRows(2, worksheet.lastRow.number) as Row[]) || [];
        for await (const row of rows) {
          ingredientIndexImports.push({
            code: row.getCell(1)?.toString(),
            name: row.getCell(2)?.toString(),
            weight: Number(row.getCell(3) || 0),
            DryMatter: Number(row.getCell(4) || 0),
            MEPoultry: Number(row.getCell(5) || 0),
            MESwine: Number(row.getCell(6) || 0),
            CrudeProtein: Number(row.getCell(7) || 0),
            CrudeFat: Number(row.getCell(8) || 0),
            CrudeFiber: Number(row.getCell(9) || 0),
            Lysine: Number(row.getCell(10) || 0),
            Methionine: Number(row.getCell(11) || 0),
            MetCys: Number(row.getCell(12) || 0),
            Threonine: Number(row.getCell(13) || 0),
            Tryptophan: Number(row.getCell(14) || 0),
            Lactose: Number(row.getCell(15) || 0),
            CaP: Number(row.getCell(16) || 0),
            LYSdigPOULTRY: Number(row.getCell(17) || 0),
            METdigPOULTRY: Number(row.getCell(18) || 0),
            MCdigPOULTRY: Number(row.getCell(19) || 0),
            THRdigPOULTRY: Number(row.getCell(20) || 0),
            TRPdigPOULTRY: Number(row.getCell(21) || 0),
            LYSdigSWINE: Number(row.getCell(22) || 0),
            METdigSWINE: Number(row.getCell(23) || 0),
            MCdigSWINE: Number(row.getCell(24) || 0),
            THRdigSWINE: Number(row.getCell(25) || 0),
            TRPdigSWINE: Number(row.getCell(26) || 0),
            Calcium: Number(row.getCell(27) || 0),
            PhosphorusTotal: Number(row.getCell(28) || 0),
            PhosphorusAvail: Number(row.getCell(29) || 0),
            Sodium: Number(row.getCell(30) || 0),
            Chloride: Number(row.getCell(31) || 0),
            Salt: Number(row.getCell(32) || 0),
            LinoleicAcid: Number(row.getCell(33) || 0),
          });
        }
        await this.ingredientIndexRepo.save(ingredientIndexImports);
      });
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
