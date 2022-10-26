import { Test, TestingModule } from '@nestjs/testing';
import { VerifyOtpController } from './verify-otp.controller';
import { VerifyOtpService } from './verify-otp.service';

describe('VerifyOtpController', () => {
  let controller: VerifyOtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyOtpController],
      providers: [VerifyOtpService],
    }).compile();

    controller = module.get<VerifyOtpController>(VerifyOtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
