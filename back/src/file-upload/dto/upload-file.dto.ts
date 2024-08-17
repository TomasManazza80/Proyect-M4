export interface UploadFileDto {
    filedname: string;
    originalname: string;
    mimetype: string;
    size:number;
    buffer: Buffer;
}