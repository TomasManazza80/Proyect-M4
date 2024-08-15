import { IsEmail, IsNumber,Matches, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    }
  )
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}