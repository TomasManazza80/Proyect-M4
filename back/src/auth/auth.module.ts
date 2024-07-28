import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, UserRepository],
})
export class AuthModule {}
