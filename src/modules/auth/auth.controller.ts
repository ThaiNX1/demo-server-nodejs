import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from 'modules/auth/dto/register.dto';
import { UserEntity } from 'entities/user.entity';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginType } from 'modules/auth/dto/login.dto';
import { AuthService } from 'modules/auth/auth.service';
import { LocalAuthGuard } from 'guards/local-auth.guard';
import { SendOtpForgotPasswordDto } from './dto/send-otp-forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginResponse } from 'modules/auth/dto/login.response';
import { VerifyOtpDto } from 'modules/auth/dto/verify-otp.dto';
import { RoleType } from '../../entities/role.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Đăng nhập bằng Email/Password' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: LoginResponse,
  })
  login(@Req() req): LoginResponse {
    if (req.body?.type === LoginType.APP && req.user?.type !== RoleType.PARTNER)
      throw new ForbiddenException('Bạn không phải CTV');
    return this.service.login(req.user);
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: UserEntity })
  register(@Body() dto: RegisterDto): Promise<UserEntity> {
    return this.service.register(dto);
  }

  @Post('verify-account')
  @HttpCode(200)
  @ApiOperation({ summary: 'Xác thực tài khoản' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiOkResponse({
    type: LoginResponse,
  })
  verifyAccount(@Body() dto: VerifyOtpDto): Promise<LoginResponse> {
    return this.service.verifyOtp(dto);
  }

  @Post('send-otp-forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Gửi OTP' })
  @ApiBody({ type: SendOtpForgotPasswordDto })
  sendOtpForgotPassword(
    @Body() dto: SendOtpForgotPasswordDto,
  ): Promise<{ message: string }> {
    return this.service.sendOtpForgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Xác thực mã OTP đổi mật khẩu' })
  @ApiBody({ type: ResetPasswordDto })
  resetPassword(@Body() dto: ResetPasswordDto): Promise<{ message: string }> {
    return this.service.resetPassword(dto);
  }
}
