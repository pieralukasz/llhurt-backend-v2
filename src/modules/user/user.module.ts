import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schemas';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BasketService } from '../basket/basket.service';
import BasketModule from '../basket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BasketModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
