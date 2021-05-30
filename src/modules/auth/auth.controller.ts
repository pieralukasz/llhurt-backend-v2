import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guard';
import { AuthService } from './auth.service';
import { Public } from '../../utils/decorators';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/token')
  async getToken(@Request() req) {
    return this.authService.token(req.user);
  }
}
