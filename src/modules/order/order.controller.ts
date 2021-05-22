import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import fetchAllWarehouseProducts from '../../api/fetchAllWarehouseProducts/fetchAllWarehouseProducts';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('warehouse-products')
  async getWarehouseProducts() {
    return await fetchAllWarehouseProducts();
  }

  //   export enum ProductCategory {
  //   overalls = 'KOMBINEZON',
  //   kidsOveralls = 'KOMBINEZONDZIECIECY',
  //   socks3941 = 'SKARPETA3941',
  //   womenShortBathrobe = 'SZLAFROKDAMSKI',
  //   womenLongBathrobe = 'SZLAFROKDAMSKIDUG',
  //   kidsBathrobe = 'SZLAFROKDZIECIECY',
  //   menBathrobe = 'SZLAFROKMSKI',
  // }

  @Get('warehouse-category')
  async getWarehouseByCategory() {}
}
