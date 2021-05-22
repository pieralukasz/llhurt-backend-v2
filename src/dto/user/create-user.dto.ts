import { IsNotEmpty, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export default CreateUserDto;
