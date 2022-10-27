import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { UserEntity } from 'entities/user.entity';
import { UserService } from './user.service';
import { Auth } from 'decorators/auth.decorator';

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
      wallets: {},
      'wallets.histories': {},
      walletHistories: {},
    },
  },
})
@Auth()
export class UserController implements CrudController<UserEntity> {
  constructor(public readonly service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}
