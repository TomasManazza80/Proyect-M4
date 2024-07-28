import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AthuGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request :  Request = context.switchToHttp().getRequest();
    const authHeader = request.header('Authirization');
    const authFormat = authHeader.split(' ');
    
    
    if(!authHeader){
      throw new HttpException('Not Authorized', HttpStatus.UNAUTHORIZED);
      }
      const credentialsBase64 = authFormat[1];
      const decodeCredentials = Buffer.from( credentialsBase64, 'base64'). toString(
        'utf-8',
      )
    
    console.log(decodeCredentials);
    const [username, password]= decodeCredentials.split(':');
    console.log(username, password);
    return true;
  }
}
