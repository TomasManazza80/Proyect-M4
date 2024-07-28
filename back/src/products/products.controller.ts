import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/response-product.dto'; // Asegúrate de que esta ruta sea correcta

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
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    const products = this.productsService.findAll();
    return {
      page,
      limit,
      data: products
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) {
      return { message: 'Error: Producto no encontrado' };
    }
    return new ProductResponseDto(product); // Asegúrate de que esta clase DTO sea correcta
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = this.productsService.update(+id, updateProductDto);
    if (updatedProduct === 'Error: Producto no encontrado') {
      return { message: 'Error: Producto no encontrado' };
    }
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const result = this.productsService.remove(+id);
    if (result === 'Error: Producto no encontrado') {
      return { message: 'Error: Producto no encontrado' };
    }
    return { id: result };
  }
}
