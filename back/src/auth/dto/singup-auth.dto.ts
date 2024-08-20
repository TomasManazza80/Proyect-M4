import { IsEmail, IsNumber,Matches, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SingUpAuthDto {
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

@IsNotEmpty()
@IsString()
passwordConfirm: string


  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;



  constructor(partial: Partial<SingUpAuthDto>) {
    Object.assign(this, partial);
  }
}