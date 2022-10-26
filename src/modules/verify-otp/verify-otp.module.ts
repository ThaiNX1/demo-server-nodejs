import { Module } from '@nestjs/common';
import { VerifyOtpService } from './verify-otp.service';
import { VerifyOtpController } from './verify-otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [VerifyOtpService],
  controllers: [VerifyOtpController],
  providers: [VerifyOtpService],
})
export class VerifyOtpModule {}
