import { Controller, Get, Req ,Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SingInAuthDto } from './dto/singin.dto';
import { SingUpAuthDto } from './dto/singup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  async singin(@Body() credentials: SingInAuthDto){
    return this.authService.singIn(credentials);
  }

  @Post('singup')
  async singUp(@Body() singUpUser:SingUpAuthDto, @Req() resquest){
    const user = await this.authService.singUp(singUpUser)
    return new UserResponseDto(user)
  }


  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

 
}
