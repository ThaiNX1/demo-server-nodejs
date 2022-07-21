import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from 'entities/user.entity';
import { ConfigService } from 'modules/config/config.service';
import { Connection, Repository } from 'typeorm';
import { RoleEntity } from '../../entities/role.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public repo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    public roleRepo: Repository<RoleEntity>,
    public configService: ConfigService,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo);
  }
}
