import { WarehouseValidResponseType } from './WarehouseResponseType';

export type ProductType = WarehouseValidResponseType & {
  amount: number;
};
