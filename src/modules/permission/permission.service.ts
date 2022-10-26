import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PermissionEntity } from "entities/permission.entity";
import { Repository } from "typeorm";

@Injectable()
export class PermissionService extends TypeOrmCrudService<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    public repo: Repository<PermissionEntity>
  ) {
    super(repo);
  }
}
