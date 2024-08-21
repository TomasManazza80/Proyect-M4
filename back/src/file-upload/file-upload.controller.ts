import { Controller } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags()
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
}
