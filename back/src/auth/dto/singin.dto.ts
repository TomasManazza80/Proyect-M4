import { IsEmail, IsNotEmpty } from "class-validator";


export class SingInAuthDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;
}