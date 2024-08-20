import {TestingModule, Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SingUpAuthDto } from './dto/singup-auth.dto';


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UsersService>={
      findOneByEmail: ()=>Promise.resolve(undefined),
      create: (entityLike?: Partial<User>) => 
        Promise.resolve({
      
        ...entityLike,
        administrator: 'user',
        id:'1234fs-1234fs-1234fs-1234fs-',
      } as User),
      
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide:JwtService,
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        }
      ],
    }).compile();

    service= module.get<AuthService>(AuthService);
  });


  const mockUser = new SingUpAuthDto({
    name: 'Jonh Doe',
    password:'123456',
    passwordConfirm:'123456',
    email: 'johndoe@me.com',
    address:'Fake Ts. 123',
    phone:'123456789',
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('singUp() create a new user rhid encrypted password', async () => {
    const user = await service.singUp(mockUser);
    console.log('MockUser', user);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrator');
    expect(user).toHaveProperty('password');
    
  });
  
});
