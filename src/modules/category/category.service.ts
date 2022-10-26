import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoryEntity } from '../../entities/product-category.entity';

@Injectable()
export class CategoryService extends TypeOrmCrudService<ProductCategoryEntity> {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    public repo: Repository<ProductCategoryEntity>,
  ) {
    super(repo);
  }
}
