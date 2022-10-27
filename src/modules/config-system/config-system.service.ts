import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConfigEntity } from '../../entities/config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class ConfigSystemService extends TypeOrmCrudService<ConfigEntity> {
  constructor(
    @InjectRepository(ConfigEntity)
    public repo: Repository<ConfigEntity>,
    @InjectRepository(UserEntity)
    public userRepo: Repository<UserEntity>,
  ) {
    super(repo);
  }
}
