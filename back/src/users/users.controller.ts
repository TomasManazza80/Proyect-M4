import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/response-user-dto';
import {AthuGuard} from '../guard/athu/athu.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query("page") page: number=1, 
    @Query("limite") limite: number=10,
  ){
    return this.usersService.findAll();
  }

  @Get(':id')
@HttpCode(HttpStatus.OK)
@UseGuards(AthuGuard)
async findOne(@Param('id') id: string): Promise<UserResponseDto> {
  const user = await this.usersService.findOne(id);
  return new UserResponseDto(user);
}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
