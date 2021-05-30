import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../types/TokenResponse';
import { comparePassword } from '../../utils/bcryptPassword';
import { User } from '@schemas';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      await this.usersService.updateUser((user as any)._id, {
        lastLogin: new Date(),
      });
      return user;
    }
    return null;
  }

  async login(user: User & { _id: MongooseSchema.Types.ObjectId }) {
    const payload: TokenResponse = {
      username: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        taxIdentifier: user.taxIdentifier,
        email: user.email,
      },
    };
  }

  async token(token: TokenResponse) {
    const user = await this.usersService.findUserById(token.sub);

    return {
      access_token: this.jwtService.sign(token),
      user: {
        taxIdentifier: user.taxIdentifier,
        email: user.email,
      },
    };
  }
}
