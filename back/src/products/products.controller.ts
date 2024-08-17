import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/response-product.dto'; // Asegúrate de que esta ruta sea correcta
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from 'src/pipes/image/image-upload/image-upload.pipe';
import {UploadFileDto} from '../file-upload/dto/upload-file.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    const productId = this.productsService.create(createProductDto);
    return { id: productId };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Get()
  @HttpCode(HttpStatus.OK)
 
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const products = this.productsService.findAll(page, limit);
    return products;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id); // Usar await para esperar a que la promesa se resuelva
    if (!product) {
      return { message: 'Error: Producto no encontrado' };
    }
    return this.transformProductToResponseDto(product);
  }
  
  private async transformProductToResponseDto(product: Product): Promise<ProductResponseDto> {
    return new ProductResponseDto(product);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = this.productsService.update(id, updateProductDto);
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const result = this.productsService.remove(id);
    return { id: result };
  }

  @Post(':id/upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    const uploadFileData: UploadFileDto = {
      filedname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };
  
    return await this.productsService.uploadFile(uploadFileData, id);
  }
}
