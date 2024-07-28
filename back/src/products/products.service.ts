// product.service.ts

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductRepository from "../products/products.repository"; // Importación corregida
 // Importación corregida

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository : ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);// aca creamos un nuevo producto usando el dt creado en la carperta dto 
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}

