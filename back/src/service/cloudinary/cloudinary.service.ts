import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import {v2 as cloudinary, UploadApiErrorResponse, UploadApiOptions} from 'cloudinary'
import { Buffer } from 'buffer';

@Injectable()
export class CloudinaryService {
    constructor(){
        dotenv.config({
            path:'.env.development.local',
        });
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadFile(buffer: Buffer, original?: string): Promise<any> {
        const options: UploadApiOptions={
            folder: 'upload',
            public_id: original,
            resource_type: 'auto',
        }
        return new Promise((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream(options, (error, result)=>{
                error ? reject(error) : resolve(result.secure_url);
            });
            stream.write(buffer);
            stream.end();
        })
    }
}
