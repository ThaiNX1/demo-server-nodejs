import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { WardEntity } from 'entities/ward.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WardService extends TypeOrmCrudService<WardEntity> {
  constructor(
    @InjectRepository(WardEntity) public repo: Repository<WardEntity>,
  ) {
    super(repo);
  }
}
