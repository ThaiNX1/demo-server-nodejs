import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ConfigEntity } from 'entities/config.entity';
import { UserEntity } from 'entities/user.entity';

@Injectable()
export class ConfigService extends TypeOrmCrudService<ConfigEntity> {
  constructor(
    @InjectRepository(ConfigEntity) public repo: Repository<ConfigEntity>,
    @InjectRepository(UserEntity)
    public userRepo: Repository<UserEntity>,
  ) {
    super(repo);
  }
}
