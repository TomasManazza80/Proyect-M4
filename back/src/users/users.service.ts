import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){} //el tipo de dato que usa UserRepository es UserRepositoy que es le repositorio que creamos 
  create(createUserDto: CreateUserDto) {                         // en el modulo que importamos, que posee el listado con los usuarios de mentira.
    return this.userRepository.create(createUserDto); //en lugar de para todos los parametros, name, email,etc. usamos el dto que creamos create-user.dto.ts, que contiene todos estos parametros.
  }

  findAll() {   //este es el metodo que retorna todos los usuarios del repositorio
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id:number){
    return this.userRepository.remove(id);
  }

  findOneByEmail(email:string){
    return this.userRepository.findOneByEmail(email);
    
  }
}
