import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SingInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8) // Puedo ajustar la longitud del password
  password: string;

  constructor(partial: Partial<SingInAuthDto>){
    Object.assign(this, partial);
  }
}