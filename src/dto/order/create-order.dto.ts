import { IsString } from 'class-validator';

class CrateOrderDto {
  @IsString()
  readonly message: string;
}

export default CrateOrderDto;
