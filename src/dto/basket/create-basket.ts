import { IsArray } from 'class-validator';
import { ProductType } from '../../types/ProductType';

class CreateBasketDto {
  @IsArray()
  readonly products: ProductType[];
}

export default CreateBasketDto;
