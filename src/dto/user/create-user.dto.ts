import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly taxIdentifier: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export default CreateUserDto;
