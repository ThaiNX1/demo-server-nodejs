import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from 'entities/base.entity';
import { RoleEntity } from 'entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('permission')
export class PermissionEntity extends BaseEntity {
  @Column()
  name: string;

  @ApiProperty({
    description: 'Hành động',
  })
  @Column()
  action: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({
    name: 'permission_role',
  })
  roles: RoleEntity[];
}
