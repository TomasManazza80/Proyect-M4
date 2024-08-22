import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../service/cloudinary/cloudinary.service';
import {UploadFileDto} from './dto/upload-file.dto';


@Injectable()
export class FileUploadService {
    constructor(private readonly cloudinaryService: CloudinaryService){}

    async uploadFile(file:UploadFileDto){
        return this.cloudinaryService.uploadFile(file.buffer, file.originalname);
    }

}
