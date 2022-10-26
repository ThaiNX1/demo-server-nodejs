import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductBrandEntity } from '../../entities/product-brand.entity';

@Injectable()
export class BrandService extends TypeOrmCrudService<ProductBrandEntity> {
  constructor(
    @InjectRepository(ProductBrandEntity)
    public repo: Repository<ProductBrandEntity>,
  ) {
    super(repo);
  }
}
