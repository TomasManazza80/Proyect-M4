import {IsEmail, IsString, Matches} from 'class-validator'; //esta es la libreria que me permite realizar las validaciones


export class CreateUserDto{
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
      {
        message:
            'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'
      }, 
    )
    password:string;

    @IsString()
    address:string;

    @IsString()
    phone:string;

    @IsString()
    country?:string;

    @IsString()
    city?:string;
    

}