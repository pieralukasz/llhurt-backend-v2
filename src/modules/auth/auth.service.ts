import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@schemas';
import { TokenResponse } from '../../types/TokenResponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password === password) {
      // TODO check password bcrypt

      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload: TokenResponse = {
      email: user.email,
      id: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async token(token: TokenResponse) {
    return { access_token: this.jwtService.sign(token) };
  }
}
