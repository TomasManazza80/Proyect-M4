import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, RequestHandler } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

  ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request :  Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request['user']=payload;
    } catch {
      throw new UnauthorizedException('invalid token');
    }
    
 
    return true;
  }

  private extractTokenFromHeader(request:Request):string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
