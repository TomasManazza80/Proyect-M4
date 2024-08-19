import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
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
  
    const isPasswordMatch = await compare(singInUser.password, user.password);
   

    if (!isPasswordMatch) {
      throw new HttpException('Wrong credentials', 401); // Use 401 for Unauthorized
      console.log("este es el password que me pasan en el singin");
      console.log(singInUser.password);
      console.log("esta es la password del usuario en la base de datos");
      console.log(user.password);
    }
  
    const token = await this.createToken(user);
    return { token };
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
  


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
