import { PartialType } from '@nestjs/mapped-types';

import CreateBasketDto from './create-basket';

class UpdateBasketDto extends PartialType(CreateBasketDto) {}

export default UpdateBasketDto;
