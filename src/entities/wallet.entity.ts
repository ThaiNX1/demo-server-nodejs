import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { WalletHistoryEntity } from './wallet-history.entity';

@Entity('nutri_wallet')
export class WalletEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'Id người dùng', required: true })
  userId: number;

  @Column({ nullable: true, default: 0 })
  @ApiProperty({ description: 'Số tiền trong ví', required: false })
  amount?: number;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;

  @OneToMany(() => WalletHistoryEntity, (history) => history.wallet)
  histories: WalletHistoryEntity[];
}
