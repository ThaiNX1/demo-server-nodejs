import { CrudController } from '@nestjsx/crud';
import { Crud } from 'decorators/crud.decorator';
import { UserEntity } from 'entities/user.entity';
import { UserService } from './user.service';
import { Auth } from 'decorators/auth.decorator';
import {
  BadRequestException,
  Body,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { User } from '../../decorators/user.decorator';
import { ChangePasswordDto } from './dto/update-user.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

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
      role: {},
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
  @Patch('/change-password/:id')
  @Auth()
  @ApiOperation({
    summary: 'Thay đổi mật khẩu',
  })
  @ApiBody({
    type: ChangePasswordDto,
  })
  async changePassword(
    @Param('id') id: number,
    @Body() dto: ChangePasswordDto,
    @User() user: UserEntity,
  ) {
    const checkPassword = await bcrypt.compare(dto.oldPassword, user.password);
    if (!checkPassword) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }
    const userUpdate = await this.service.repo.findOne({ id });
    if (!userUpdate) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }
    userUpdate.password = dto.newPassword;
    return await this.service.repo.save(userUpdate);
  }
  @Patch('/update-user-waller/:id')
  @Auth()
  @ApiOperation({
    summary: 'Cập nhật số dư cho người dùng',
  })
  @ApiBody({
    type: UpdateWalletDto,
  })
  async updateWallet(@Param('id') id: number, @Body() dto: UpdateWalletDto) {
    return await this.service.updateWallet(id, dto);
  }
}
