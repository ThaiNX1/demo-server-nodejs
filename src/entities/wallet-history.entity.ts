import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { WalletEntity } from './wallet.entity';

@Entity('wallet-history')
export class WalletHistoryEntity extends BaseEntity {
  @Column()
  @ApiProperty({ description: 'Id người dùng', required: true })
  userId: number;

  @Column()
  @ApiProperty({ description: 'Id ví người dùng', required: true })
  walletId: number;

  @Column()
  @ApiProperty({ description: 'Số tiền giao dịch', required: true })
  amount: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Ghi chú', required: false })
  note?: string;

  @ManyToOne(() => UserEntity, (user) => user.walletHistories)
  user: UserEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.histories)
  wallet: WalletEntity;
}
