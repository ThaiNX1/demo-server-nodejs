import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'entities/user.entity';
import { ConfigModule } from 'modules/config/config.module';
import { UserController } from 'modules/user/user.controller';
import { UserService } from 'modules/user/user.service';
import { RoleEntity } from '../../entities/role.entity';

@Module({
  imports: [
    NestConfigModule,
    JwtModule.registerAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JTW_EXPIRE_IN'),
          issuer: 'https://ushare.com.vn',
        },
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
    ]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
