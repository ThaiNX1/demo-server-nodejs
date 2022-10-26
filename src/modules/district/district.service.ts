import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DistrictEntity } from 'entities/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService extends TypeOrmCrudService<DistrictEntity> {
  constructor(
    @InjectRepository(DistrictEntity) public repo: Repository<DistrictEntity>,
  ) {
    super(repo);
  }
}
