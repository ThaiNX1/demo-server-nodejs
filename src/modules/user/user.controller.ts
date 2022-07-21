import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { UserEntity } from 'entities/user.entity';
import { UserService } from './user.service';
import { Auth } from 'decorators/auth.decorator';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Crud({
  name: 'Thành viên',
  controller: 'users',
  model: {
    type: UserEntity,
  },
  query: {
    exclude: ['password'],
    join: {
      ward: {},
      'ward.district': {
        alias: 'district',
      },
      'ward.district.province': {
        alias: 'province',
      },
      parent: {},
      referral: {},
      role: {},
      products: {},
      wallets: {},
      'wallets.histories': {},
      'wallets.transactions': {},
      walletHistories: {},
      walletTransactions: {},
      merchant: {},
      leaders: {
        eager: true,
        allow: ['fullName'],
        alias: 'leaders',
      },
      merchants: {
        eager: true,
        allow: ['name'],
      },
      bank: {},
      customers: {},
      'customers.addresses': {},
    },
  },
})
@Auth()
export class UserController implements CrudController<UserEntity> {
  constructor(
    public readonly service: UserService,
    private jwtService: JwtService,
  ) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}
