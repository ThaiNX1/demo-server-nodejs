import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { ProductVariantEntity } from '../../entities/product-variant.entity';

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    public repo: Repository<ProductEntity>,
    @InjectRepository(ProductVariantEntity)
    public variantRepo: Repository<ProductVariantEntity>,
  ) {
    super(repo);
  }
}
