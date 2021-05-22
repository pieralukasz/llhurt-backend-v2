import { Injectable } from '@nestjs/common';

import { fetchAllWarehouseProducts } from '@api';

import filterByCategoryName from './utils/filterByCategoryName';

import { WarehouseValidResponseType } from '../../types/WarehouseResponseType';
import { ProductCategory } from '../../types/enum/ProductCategory';

@Injectable()
export class WarehouseService {
  async getWarehouseProducts(): Promise<WarehouseValidResponseType[]> {
    return await fetchAllWarehouseProducts();
  }

  async getWarehouseProductByCategory(categoryName: ProductCategory) {
    const warehouseProducts = await fetchAllWarehouseProducts();
    return filterByCategoryName(warehouseProducts, categoryName);
  }
}
