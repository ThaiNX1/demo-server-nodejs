import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import { UserModule } from 'modules/user/user.module';
import { LocalStrategy } from 'modules/auth/strategies/local.strategy';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { VerifyOtpModule } from 'modules/verify-otp/verify-otp.module';
import { ConfigModule } from 'modules/config/config.module';

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
    UserModule,
    VerifyOtpModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
