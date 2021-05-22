import { Injectable } from '@nestjs/common';
import fetchAllWarehouseProducts from '../../api/fetchAllWarehouseProducts/fetchAllWarehouseProducts';
import { WarehouseValidResponseType } from '../../types/WarehouseResponseType';
import filterByCategoryName from './utils/filterByCategoryName';
import { ProductCategory } from '../../types/enum/ProductCategory';

@Injectable()
export class WarehouseService {
  private readonly warehouseProducts: Promise<WarehouseValidResponseType[]>;

  constructor() {
    this.warehouseProducts = this.getWarehouseProducts();
  }

  async getWarehouseProducts(): Promise<WarehouseValidResponseType[]> {
    return await fetchAllWarehouseProducts();
  }

  async getWarehouseProductByCategory(categoryName: ProductCategory) {
    return filterByCategoryName(await this.warehouseProducts, categoryName);
  }
}
