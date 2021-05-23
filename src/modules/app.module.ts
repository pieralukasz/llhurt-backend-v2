import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '@environments';

import OrderModule from './order';
import WarehouseModule from './warehouse';
import UserModule from './user';
import AuthModule from './auth';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRoot(config().mongoUrl),
    AuthModule,
    UserModule,
    OrderModule,
    WarehouseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
