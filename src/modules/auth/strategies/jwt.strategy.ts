import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AuthService } from 'modules/auth/auth.service';
import { UserDecoded } from 'interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private nestConfigService: NestConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: nestConfigService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: UserDecoded) {
    return await this.authService.validate(payload);
  }
}
