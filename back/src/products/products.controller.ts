import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/response-product.dto'; // Asegúrate de que esta ruta sea correcta
import { Product } from './entities/product.entity';



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
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    const products = this.productsService.findAll(page, limit); // Pasar los argumentos page y limit
    return {
      page,
      limit,
      data: products
    };
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
}
