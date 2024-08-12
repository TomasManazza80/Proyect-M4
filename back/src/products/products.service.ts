// product.service.ts

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

 // Importación corregida

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page:number, limit: number) {
    return await this.productRepository.find({
      take: limit,
      skip: (page-1)*limit,
    });
  }

  async findOne(id: string) {       //si hay errores al momento de ejecutar esta funcion es porque el id tiene que ser un string
    return await this.productRepository.findOne({where: {id}});
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    console.log('UpdateProductDto', updateProductDto);
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({where: {id}});
  }

  async remove(id: string):Promise<{id:string}> {
    await this.productRepository.delete(id);
    return {id};
  }

  async buyProduct (id:string){
    const product = await this.productRepository.findOne({where: {id}});
    if(product.stock===0){
      throw new Error('No hay stock del producto');
    } 
    await this.productRepository.update( id, {
      stock: product.stock-1,
  });
  console.log('producto comprado');
  return product.price;
  }

}

