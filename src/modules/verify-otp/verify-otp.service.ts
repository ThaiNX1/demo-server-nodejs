import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities/user.entity';
import { google, identitytoolkit_v3 } from 'googleapis';
import { Repository } from 'typeorm';
import { SendVerifyOtpDto } from './dto/send-verify-otp.dto';
import Identitytoolkit = identitytoolkit_v3.Identitytoolkit;
import Schema$IdentitytoolkitRelyingpartyGetAccountInfoRequest = identitytoolkit_v3.Schema$IdentitytoolkitRelyingpartyGetAccountInfoRequest;

@Injectable()
export class VerifyOtpService {
  googleApisConfig: Identitytoolkit;

  constructor(
    public configService: ConfigService,
    @InjectRepository(UserEntity)
    public userRepo: Repository<UserEntity>,
  ) {
    this.googleApisConfig = google.identitytoolkit({
      auth: this.configService.get<string>('GOOGLE_API_KEY'),
      version: 'v3',
    });
  }

  protected convertTel(tel: string) {
    if (tel.charAt(0) === '0') tel = tel.replace(tel.charAt(0), '+84');
    return tel;
  }

  async verifyOtp(
    verifyOtpDto: Schema$IdentitytoolkitRelyingpartyGetAccountInfoRequest,
  ): Promise<any> {
    try {
      // Xác thực code otp
      const verifyCode =
        await this.googleApisConfig.relyingparty.getAccountInfo({
          requestBody: {
            idToken: verifyOtpDto.idToken,
            // phoneNumber: verifyOtpDto.phoneNumber,
          },
        });
      if (verifyCode.status !== 200) return false;
      return (
        verifyCode?.data?.users?.[0]?.phoneNumber ===
        this.convertTel(verifyOtpDto.phoneNumber[0])
      );
    } catch (error) {
      console.log('Lỗi Google API', error);
      return false;
    }
  }

  async sendVerifyOtp(
    sendVerifyOtpDto: SendVerifyOtpDto,
    user?: UserEntity,
  ): Promise<any> {
    // Lấy session verify code khi gửi otp
    try {
      const sendVerificationCodeResponse =
        await this.googleApisConfig.relyingparty.sendVerificationCode({
          requestBody: {
            phoneNumber: sendVerifyOtpDto.phoneNumber,
            recaptchaToken: sendVerifyOtpDto.recaptchaToken,
          },
        });
      // save sessionInfo into db. You will need this to verify the SMS code
      if (!sendVerificationCodeResponse?.data?.sessionInfo) return false;

      if (user?.id) {
        // Update user.sessionVerifyInfo
        user.sessionVerifyCode =
          sendVerificationCodeResponse?.data?.sessionInfo;

        await this.userRepo.save(user);
      }

      return sendVerificationCodeResponse?.data?.sessionInfo;
    } catch (e) {
      console.log('Lỗi Google API', e);
      return false;
    }
  }
}
