import { WarehouseValidResponseType } from '../../../types/WarehouseResponseType';
import { ProductCategory } from '../../../types/enum/ProductCategory';

const filterByCategoryName = (
  warehouseProducts: WarehouseValidResponseType[],
  categoryName: ProductCategory,
): WarehouseValidResponseType[] => {
  return warehouseProducts.filter((product) => {
    return product.category === ProductCategory[categoryName];
  });
};

export default filterByCategoryName;
