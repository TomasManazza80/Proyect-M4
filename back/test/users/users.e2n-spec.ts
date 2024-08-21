import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppModule} from '../../../back/src/app.module';
import {UsersService} from '../../src/users/users.service';
import * as crypto from 'crypto';
import { request } from 'http';
import { User } from './../../src/users/entities/user.entity';

describe('User (e2e)', ()=>{
  let app: INestApplication;
  let authToken: string;
  let userService: UsersService;

  beforeEach(async ()=>{
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = await app.init();

    userService = moduleFixture.get<UsersService>(UsersService);
    const hashedPassword = await crypto.hash('12345', 'sha256');
    jest.spyOn(userService, 'findOneByEmail').mockImplementation(async (email) => {
      if(email === "johndoe@me.com"){
        return Promise.resolve({
          email: "johndoe@me.com",
          password: hashedPassword,
          administrator: "user",
        } as User);
      }else{
        return Promise.resolve(undefined);
      }
    });

    jest.spyOn(userService, 'findAll').mockImplementation(async () => {
        return Promise.resolve([
          {
            email: 'johndou@email.com',
            administrator: 'user',
          }
        ] as User[]);
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/singin')
      .send({
        email: 'johndou@email.com',
        password: '123456',
      });
    authToken = loginResponse.body['token'];
  });

  afterEach(async()=>{
    await app.close();
  });

  it('/user (GET) return array whit users and OK status', async()=>{
    const req = await request(app.getHttpServer())
      .Get('/users'),
      .Set('Authorization', `Bearer ${authToken}`);

    console.log("TOKEN", authToken);
    console.log("Request", req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});