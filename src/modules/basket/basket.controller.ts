import { Controller, Get, Request } from '@nestjs/common';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  async getBasket(@Request() req) {
    console.log(req);
    return req.user;
  }
}
