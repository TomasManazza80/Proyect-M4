import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../../src/users/users.service';
import { SingInAuthDto } from './dto/singin.dto';
import { JwtService } from '@nestjs/jwt';

import {hash, compare} from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { SingUpAuthDto } from './dto/singup-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  async singIn(singInUser: SingInAuthDto) {
    const user = await this.userService.findOneByEmail(singInUser.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    console.log("pasword de el usuario que intenta ingresa:")
  
    console.log(singInUser.password)


    console.log("pasword de la base de datos:")
  
    console.log(singInUser.password)

    const isPasswordMatch = null;
   const passwordDataBase = await user.password;
   const passwordSingUser = await singInUser.password;

if(passwordDataBase === passwordSingUser){
  console.log('USUARIO LOGEADO CORRECTAMENTE');
  const token = await this.createToken(user);
    return { token };
}
      //const token = await this.createToken(user);
      //return { token };
      throw new HttpException('Wrong credentials', 401); // Use 401 for Unauthorized
      console.log("este es el password que me pasan en el singin");
      console.log(singInUser.password);
      console.log("esta es la password del usuario en la base de datos");
      console.log(user.password);
    
  }

  private async createToken (userData: User) {
    const payload = {
      id: userData.id,
      email: userData.email,
    };
  
    return this.jwtService.signAsync(payload);
  }


  async singUp(singUpUser:SingUpAuthDto){

  if(singUpUser.password !== singUpUser.passwordConfirm){
    throw new HttpException('Passwords do not match', 400);
  }


  singUpUser.password=await hash(singUpUser.password, 10)
  return this.userService.create(singUpUser);
}
  
async findAll(): Promise<any[]> {
  const users = await this.userService.findAll();
  return users.map((user) => ({
    id: user.id,
    email: user.email,
  }));
}

async findOne(id: string): Promise<any> {
  const user = await this.userService.findOne(id);
  if (!user) {
    throw new HttpException('User not found', 404);
  }
  return {
    id: user.id,
    email: user.email,
  };
}

async update(id: string, updateAuthDto: UpdateAuthDto): Promise<any> {
  const user = await this.userService.findOne(id);
  if (!user) {
    throw new HttpException('User not found', 404);
  }
  const updateUserDto = {
    ...updateAuthDto,
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
  };
  await this.userService.update(id, updateUserDto);
  return {
    id: user.id,
    email: user.email,
  };
}
async remove(id: string): Promise<void> {
  const user = await this.userService.findOne(id);
  if (!user) {
    throw new HttpException('User not found', 404);
  }
  await this.userService.remove(id);
}
}
