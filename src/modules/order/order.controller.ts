import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  createOrder(@Req() req, @Res() res) {
    return this.orderService.createNewOrder();
  }
}
