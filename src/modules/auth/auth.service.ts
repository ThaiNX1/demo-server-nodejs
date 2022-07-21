import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { WalletType } from 'enums';
import { IsNull, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { UserDecoded } from 'interfaces';
import { ConfigType } from 'entities/config.entity';
import { UserEntity, UserStatus } from 'entities/user.entity';
import { UserService } from 'modules/user/user.service';
import { RegisterDto } from 'modules/auth/dto/register.dto';
import { VerifyOtpService } from 'modules/verify-otp/verify-otp.service';
import { ConfigService } from 'modules/config/config.service';
import { SendOtpForgotPasswordDto } from './dto/send-otp-forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginResponse } from 'modules/auth/dto/login.response';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(VerifyOtpService)
    private verifyOtpService: VerifyOtpService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  protected convertTel(tel: string) {
    if (tel.charAt(0) === '0') tel = tel.replace(tel.charAt(0), '+84');
    return tel;
  }

  async validate(payload: UserDecoded) {
    const user = await this.userService.repo.findOne(payload.sub, {
      relations: ['role'],
    });
    if ([UserStatus.BANNED, UserStatus.INACTIVE].includes(user?.status)) {
      return false;
    }

    return user;
  }

  async validateUser(tel, password) {
    const user = await this.userService.repo.findOne({
      where: {
        tel,
      },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(
        'Tên truy cập không tồn tại! Vui lòng thử lại!',
      );
    }

    if (!user.roleId) {
      throw new ForbiddenException('Tài khoản chưa được cấp quyền');
    }

    const samePassword = await compare(password, user.password);
    if (!samePassword) {
      throw new BadRequestException('Mật khẩu không đúng. Vui lòng thử lại!');
    }
    if ([UserStatus.BANNED, UserStatus.INACTIVE].includes(user?.status)) {
      throw new ForbiddenException('Tài khoản chưa kích hoạt');
    }
    let avatar = '';
    if (!user.avatar?.includes('http') && !user.avatar?.includes('https'))
      avatar = 'https://ushare.hn.ss.bfcplatform.vn/' + user.avatar;
    else avatar = user.avatar;
    return {
      tel: user.tel,
      roleId: user.roleId,
      fullName: user.fullName,
      permissions: user?.role?.permissions || [],
      sub: user.id,
      type: user?.role?.type,
      status: user.status,
      avatar: avatar,
    };
  }

  login(user: any): LoginResponse {
    return {
      token: this.jwtService.sign(user),
    };
  }

  async register(dto: RegisterDto): Promise<UserEntity> {
    const phoneRegExp = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
    if (!dto.tel.match(phoneRegExp)) {
      throw new BadRequestException(
        `Số điện thoại ${dto.tel} không đúng định dạng`,
      );
    }
    const existUser = await this.userService.repo.findOne({
      tel: dto.tel,
    });

    if (existUser && existUser.status === UserStatus.INACTIVE) {
      existUser.password = dto.password;
      existUser.fullName = dto.fullName;
      existUser.tel = dto.tel;
      existUser.gender = dto.gender;
      existUser.wardId = dto.wardId;
      existUser.dob = dto.dob;
      existUser.email = dto.email;
      existUser.roleId = 2;
      existUser.status = UserStatus.INACTIVE;
      await this.userService.repo.save(existUser);
      return existUser;
    } else if (existUser && existUser.status === UserStatus.ACTIVE) {
      throw new BadRequestException('Số điện thoại đã được đăng ký');
    } else {
      const user = new UserEntity();
      user.password = dto.password;
      user.fullName = dto.fullName;
      user.tel = dto.tel;
      user.gender = dto.gender;
      user.wardId = dto.wardId;
      user.dob = dto.dob;
      user.email = dto.email;
      user.roleId = 2;
      user.status = UserStatus.INACTIVE;

      if (dto.referralCode) {
        const referralUser = await this.userService.repo.findOne({
          tel: dto.referralCode,
        });
        if (!referralUser)
          throw new NotFoundException('Mã giới thiệu không tồn tại!');
        await this.userService.repo.save(referralUser);
        user.referralParent = referralUser;
      }

      const userCreated = await this.userService.repo.save(user);
      if (!userCreated)
        throw new Error('Không thể tạo tài khoản! Vui lòng thử lại');

      const registerConfig = await this.configService.findOne({
        where: {
          merchantId: IsNull(),
          key: ConfigType.REGISTER,
          startDate: LessThanOrEqual(new Date()),
          endDate: MoreThanOrEqual(new Date()),
        },
      });

      let amount = 0;

      if (registerConfig && registerConfig.value) {
        const fValue = dto.referralCode
          ? registerConfig.value['f1']
          : registerConfig.value['f0'];
        amount = !isNaN(fValue) ? Number(fValue) : 0;
      }

      return userCreated;
    }
  }

  // Xác thực mã otp và update status User
  async verifyOtp(dto: VerifyOtpDto): Promise<LoginResponse> {
    const existUser = await this.userService.repo.findOne({
      where: { tel: dto.tel },
      select: ['tel', 'id', 'fullName', 'roleId'],
      relations: ['role'],
    });

    if (!existUser) {
      throw new BadRequestException(
        'Xác thực thất bại. Vui lòng kiểm tra số điện thoại!',
      );
    }

    const verifyCodeStatus = await this.verifyOtpService.verifyOtp({
      idToken: dto.idToken,
      phoneNumber: [this.convertTel(dto.tel)],
    });
    // if (verifyCode.status !== 200)
    if (!verifyCodeStatus)
      throw new BadRequestException(
        'Xác thực thất bại. Vui lòng kiểm tra số điện thoại!',
      );

    await this.userService.repo.update(
      { id: existUser.id },
      {
        status: UserStatus.ACTIVE,
      },
    );

    // notify for referal user
    // if (existUser.referralParent) {
    //   this.notificationService.sendNotificationToUser({
    //     userId: existUser.referralParent.id,
    //     title: `Tài khoản ${existUser.tel} đã đăng ký thành công từ link giới thiệu của bạn!`,
    //     body: '',
    //     type: NotificationType.BONUS,
    //     data: {},
    //   });
    // }

    return {
      token: this.jwtService.sign({
        tel: existUser.tel,
        fullName: existUser.fullName,
        permissions: existUser?.role?.permissions || [],
        sub: existUser.id,
        roleId: existUser?.roleId,
      }),
    };
  }

  async sendOtpForgotPassword(dto: SendOtpForgotPasswordDto) {
    const user = await this.userService.repo.findOne({
      where: {
        tel: dto.tel,
      },
    });
    if (!user) throw new BadRequestException('Số điện thoại không tồn tại');

    // Send otp
    const sessionInfo = await this.verifyOtpService.sendVerifyOtp({
      phoneNumber: this.convertTel(dto.tel),
      recaptchaToken: dto.recaptchaToken,
    });

    if (!sessionInfo)
      throw new BadRequestException(
        'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại',
      );

    return Promise.resolve({
      message: 'OK',
    });
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userService.repo.findOne({
      where: {
        tel: dto.tel,
      },
      select: ['id', 'passwordHistory', 'password'],
    });
    if (!user)
      throw new BadRequestException(
        'Số điện thoại không tồn tại trên hệ thống',
      );

    const verifyCodeStatus = await this.verifyOtpService.verifyOtp({
      idToken: dto.idToken,
      phoneNumber: [this.convertTel(dto.tel)],
    });
    if (!verifyCodeStatus)
      throw new BadRequestException(
        'Xác thực thất bại. Vui lòng kiểm tra số điện thoại!',
      );

    // Update mật khẩu
    user.password = dto.password;
    await this.userService.repo.save(user);

    return Promise.resolve({
      message: 'OK',
    });
  }
}
