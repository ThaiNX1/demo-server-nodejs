import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from 'entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { RoleEntity } from '../../entities/role.entity';
import { WalletEntity } from '../../entities/wallet.entity';
import { WalletHistoryEntity } from '../../entities/wallet-history.entity';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { UserStatus } from '../../enums';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    public repo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    public roleRepo: Repository<RoleEntity>,
    @InjectRepository(WalletEntity)
    public walletRepo: Repository<WalletEntity>,
    @InjectRepository(WalletHistoryEntity)
    public walletHistoryRepo: Repository<WalletHistoryEntity>,
    @InjectConnection() private connection: Connection,
  ) {
    super(repo);
  }

  async updateWallet(id: number, dto: UpdateWalletDto): Promise<any> {
    const user = await this.repo.findOne({ id });
    if (!user || user.status !== UserStatus.ACTIVE)
      throw new BadRequestException(
        'Người dùng không tồn tại hoặc chưa được kích hoạt',
      );
    const wallet = await this.walletRepo.findOne({
      where: {
        userId: user.id,
      },
    });
    const walletUpdate = await this.walletRepo.save({
      ...wallet,
      userId: user.id,
      amount: Number(wallet?.amount || 0) + Number(dto.amount || 0),
    });
    await this.walletHistoryRepo.save({
      walletId: walletUpdate.id,
      userId: user.id,
      amount: Number(dto.amount || 0),
    });
  }
}
