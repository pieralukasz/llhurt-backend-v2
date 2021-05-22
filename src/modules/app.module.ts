import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '@environments';

import AuthorizationModule from './authorization';
import OrderModule from './order';
import WarehouseModule from './warehouse';
import UserModule from './user';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRoot(config().mongoUrl),
    AuthorizationModule,
    OrderModule,
    WarehouseModule,
    UserModule,
  ],
})
export class AppModule {}
