import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/response-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    console.log('Creando usuario:', createUserDto);
    const newUser = this.userRepository.create(createUserDto);
    console.log('Nuevo usuario creado:', newUser);
    try {
      const savedUser = await this.userRepository.save(newUser);
      console.log('Usuario guardado:', savedUser);
      return savedUser;
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      throw error;
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user: User) => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOneBy({ id }); // Search by UUID
    if (!user) {
      return null;
    }
    return new UserResponseDto(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    // assuming you have a repository that can find a user by email
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}