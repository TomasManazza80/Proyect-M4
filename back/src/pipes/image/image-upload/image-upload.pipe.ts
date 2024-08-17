import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadPipe implements PipeTransform {
  
  private readonly allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ]
  
private readonly maxSizeInBytes = 10485760;

  transform(file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('no file upload');
    }

    if(!this.allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException('invalid file tipe');
    }

    if(file.size > this.maxSizeInBytes){
      throw new BadRequestException('file too large');
  }
  return file;
}
}