import { Controller, Get, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ProductCategory } from '../../types/enum/ProductCategory';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  async getWarehouseProducts() {
    return this.warehouseService.getWarehouseProducts();
  }

  @Get('category')
  async getWarehouseProductByCategory(
    @Query('name') categoryName: ProductCategory,
  ) {
    return this.warehouseService.getWarehouseProductByCategory(categoryName);
  }
}
