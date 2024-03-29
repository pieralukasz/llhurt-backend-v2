import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

import UserModule from '../user';

import config from '@environments';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config().jwtUserSecret,
      signOptions: { expiresIn: '5000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
