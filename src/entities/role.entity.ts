import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from 'entities/base.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export enum RoleType {
  ADMIN = 'admin', // Quyền admin
  CUSTOMER = 'customer', // Quyền NCC,
  MEMBER = 'member', // Thành viên,
  LEADER = 'leader', // Quyền Trưởng nhóm
  PARTNER = 'partner', // Quyền CTV
  OTHER = 'other', // Quyền khác
}

@Entity('role')
export class RoleEntity extends BaseEntity {
  @ApiProperty({
    description: 'Tên nhóm',
  })
  @IsNotEmpty({
    message: 'Tên nhóm không được bỏ trống',
  })
  @IsString()
  @Transform(({ value }) => value.trim())
  @Column()
  name: string;

  @ApiProperty({
    description: 'Quyền',
  })
  @Column({
    type: 'jsonb',
    default: [''],
  })
  permissions: string[];

  @ApiProperty({
    description: 'Loại quyền',
    type: 'enum',
    enum: RoleType,
  })
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.MEMBER,
    nullable: true,
  })
  type?: RoleType;

  @OneToMany(() => UserEntity, (user) => user.role)
  public users: UserEntity[];
}
