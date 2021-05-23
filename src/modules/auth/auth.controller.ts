import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guard';
import { AuthService } from './auth.service';
import { Public } from '../../utils/decorators';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('auth/token')
  async getToken(@Request() req) {
    return this.authService.token(req.user);
  }
}
