import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber,Matches, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'the name of user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;


  @ApiProperty({
    type: String,
    description: 'the email of the user',
    required: true,
  })
  @IsEmail()
  email: string;


  @ApiProperty({
    type: String,
    description: 'the pasword of the user',
    required: true,
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
    }
  )
  @IsString()
  password: string;


  @ApiProperty({
    type: String,
    description: 'the address of the user',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({
    type: String,
    description: 'the phone number of the  user',
    required: true,
  })
  @IsString()
  phone: string;


  @ApiProperty({
    type: String,
    description: 'the country of the user',
    required: false,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;


  @ApiProperty({
    type: String,
    description: 'the city of the user',
    required: false,
  })

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}


