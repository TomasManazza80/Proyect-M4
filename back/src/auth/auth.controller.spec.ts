import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../src/users/users.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { SingInAuthDto } from './dto/singin.dto';
import { SingUpAuthDto } from './dto/singup-auth.dto';
import { UserResponseDto } from 'src/users/dto/response-user-dto';

import * as bcrypt from 'bcrypt';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hasedPassword = await bcrypt.hash('123456', 10);
    const mockUserService: Partial<UsersService> = {
      findOneByEmail: (email: string) => {
        if (email === 'johndoe@me.com') {
          return Promise.resolve({
            email: 'jhondou@email.com',
            password: hasedPassword,
            administrator: 'user',
            id: '1234fs-1234fs-1234fs-1234fs-',
          } as Partial<User> as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (entityLike?: Partial<User>): Promise<User> =>
        Promise.resolve({
          ...entityLike,
          administrator: 'user',
          id: '1234fs-1234fs-1234fs-1234fs-',
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const mockUser = new SingUpAuthDto({
    name: 'Jonh Doe',
    password: '123456',
    passwordConfirm: '123456',
    email: 'johndoe@me.com',
    address: 'Fake Ts. 123',
    phone: '123456789',
  });

  const mockSingUp = new SingUpAuthDto({
    name: 'Jonh Doe',
    password: '123456',
    passwordConfirm: '123456',
    email: 'johndoe@me.com',
    address: 'Fake Ts. 123',
    phone: '123456789',
  });

  const mockSingInUser = new SingInAuthDto({
    email: 'johndoe@me.com',
    password: '123456',
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('singUp() should return a UserResponseDto and create User', async () => {
    const mockRequest = {};
    const user = await controller.singUp(mockSingUp, mockRequest);
    expect(user).toBeInstanceOf(UserResponseDto);
    expect(user).toHaveProperty('id');
  });

  it('singIn() should return a token', async()=>{
    const token = await controller.singin(mockSingInUser);
    console.log(token);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token')
  })
});