import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../types/TokenResponse';
import { comparePassword } from '../../utils/bcryptPassword';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload: TokenResponse = {
      username: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // TODO check if is good
  async token(token: TokenResponse) {
    return { access_token: this.jwtService.sign(token) };
  }
}
