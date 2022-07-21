import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProvinceEntity } from 'entities/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService extends TypeOrmCrudService<ProvinceEntity> {
  constructor(
    @InjectRepository(ProvinceEntity) public repo: Repository<ProvinceEntity>,
  ) {
    super(repo);
  }
}
