import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RoleEntity } from 'entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends TypeOrmCrudService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) public repo: Repository<RoleEntity>,
  ) {
    super(repo);
  }

  async updateMany(dto: RoleEntity[]) {
    return await this.repo.save(dto);
  }
}
