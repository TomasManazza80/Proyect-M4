import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number; // Modificar el tipo de la propiedad phone
    // Resto de las propiedades
}
