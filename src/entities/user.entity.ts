import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import {
  IsNumberString,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { BaseEntity } from 'entities/base.entity';
import { RoleEntity } from 'entities/role.entity';
import { WardEntity } from 'entities/ward.entity';
import { UserGender, UserStatus } from 'enums';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { WalletHistoryEntity } from './wallet-history.entity';

@Entity('nutri_user')
@Tree('materialized-path')
export class UserEntity extends BaseEntity {
  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Email',
    required: false,
  })
  email?: string;

  @Column()
  @IsOptional()
  @ApiProperty({
    description: 'Mật khẩu',
  })
  @MinLength(6, { message: 'Mật khẩu cần có độ dài >= 6 ký tự!' })
  password?: string;

  @IsOptional()
  @Column({
    default: [],
    type: 'jsonb',
    nullable: true,
  })
  @ApiProperty({
    description: 'Lưu các mật khẩu cũ',
    required: false,
  })
  passwordHistory: string[];

  @Column()
  @ApiProperty({
    description: 'Tên',
  })
  fullName: string;

  @ApiProperty({
    description: 'Số điện thoại',
  })
  // @Length(10, 12)
  @IsNumberString()
  @Column({
    unique: true,
  })
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
    message: 'Số điện thoại không đúng định dạng',
  })
  tel?: string;

  @Column({
    nullable: true,
    default: 8,
  })
  @ApiProperty({
    description: 'Role ID',
    required: false,
  })
  roleId?: number;

  @ApiProperty({
    description: 'Role',
    required: false,
    type: RoleEntity,
  })
  @ManyToOne(() => RoleEntity, (role) => role.users, {
    nullable: true,
  })
  role: RoleEntity;

  @ApiProperty({
    description: 'Danh sách cấp dưới ',
    required: false,
    type: [UserEntity],
  })
  @TreeChildren()
  referralChildren?: UserEntity[];

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Id cấp trên',
    required: false,
    type: Number,
  })
  referralParentId?: number;

  @ApiProperty({
    description: 'Cấp trên',
    required: false,
    type: UserEntity,
  })
  @TreeParent()
  referralParent?: UserEntity;

  @Column({
    nullable: true,
    select: false,
  })
  @ApiProperty({
    description: 'Session sau khi gửi xác nhận SĐT với Firebase',
    required: false,
  })
  sessionVerifyCode?: string;

  @Column({
    nullable: true,
  })
  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Số CMTND/CCCD',
    required: false,
  })
  nationalId?: string;

  @Column({
    nullable: true,
    type: 'timestamp with time zone',
  })
  @ApiProperty({
    description: 'Ngày cấp',
    required: false,
  })
  nationalIssueDate?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Nơi cấp',
    required: false,
  })
  nationalIssueBy?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Địa chỉ',
    required: false,
  })
  address?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Phường/Xã',
    required: false,
  })
  wardId?: number;

  @ApiProperty({
    description: 'Ward',
    required: false,
    type: WardEntity,
  })
  @ManyToOne(() => WardEntity, (ward) => ward.id)
  ward?: WardEntity;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Số tài khoản',
    required: false,
  })
  bankNumber?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Chủ tài khoản',
    required: false,
  })
  bankAccountName?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'Chi nhánh ngân hàng',
    required: false,
  })
  bankBranch?: string;

  @Column({
    nullable: true,
    type: 'timestamp with time zone',
  })
  @ApiProperty({
    description: 'Ngày sinh',
    required: false,
  })
  dob?: Date;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.OTHER,
  })
  @ApiProperty({
    description: 'Giới tính',
    enum: UserGender,
  })
  gender: UserGender;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  @ApiProperty({
    description: 'Trạng thái',
    enum: UserStatus,
  })
  status: UserStatus;

  @ApiProperty({ description: 'Ảnh đại diện', required: false })
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty({
    description: 'Wallet',
    required: false,
    type: [WalletEntity],
  })
  @OneToMany(() => WalletEntity, (wallet) => wallet.userId)
  wallets: WalletEntity[];

  @ApiProperty({
    description: 'Wallet History',
    required: false,
    type: [WalletHistoryEntity],
  })
  @OneToMany(() => WalletHistoryEntity, (wallet) => wallet.userId)
  walletHistories: WalletHistoryEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
