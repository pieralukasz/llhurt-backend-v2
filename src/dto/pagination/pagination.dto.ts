import { IsOptional, IsPositive, MaxLength } from 'class-validator';

class PaginationDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}

export default PaginationDto;
