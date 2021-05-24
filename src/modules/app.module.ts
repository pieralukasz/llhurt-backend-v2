import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './auth/guard';
import { RolesGuard } from './auth/guard';

import config from '@environments';

import OrderModule from './order';
import WarehouseModule from './warehouse';
import UserModule from './user';
import AuthModule from './auth';
import ImageModule from './image';
import BasketModule from './basket';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    MongooseModule.forRoot(config().mongoUrl),
    AuthModule,
    UserModule,
    OrderModule,
    WarehouseModule,
    BasketModule,
    ImageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
