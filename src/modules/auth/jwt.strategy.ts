import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import config from '@environments';

import { TokenResponse } from '../../types/TokenResponse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().jwtUserSecret,
    });
  }

  async validate(payload: any): Promise<TokenResponse> {
    return {
      username: payload.email,
      sub: payload.id,
    };
  }
}
