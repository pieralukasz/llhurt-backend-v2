import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from '@schemas';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import MailModule from '../mail';
import BasketModule from '../basket';
import UserModule from '../user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    BasketModule,
    MailModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export default class OrderModule {}
