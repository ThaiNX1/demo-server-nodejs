import { Controller } from '@nestjs/common';
import { VerifyOtpService } from './verify-otp.service';

@Controller('verify-otp')
export class VerifyOtpController {
  constructor(private readonly verifyOtpService: VerifyOtpService) {}
}
