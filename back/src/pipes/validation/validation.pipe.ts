import { 
  ArgumentMetadata, 
  BadRequestException,
  Injectable, 
  PipeTransform } from '@nestjs/common';

  import { Validate, validate } from 'class-validator';
  import {plainToInstance} from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype; // obtener el tipo de dato de la metadata
    if(!metatype || !this.toValidate(metatype)) {
      return value;
    }  
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types:Function[]=[String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}