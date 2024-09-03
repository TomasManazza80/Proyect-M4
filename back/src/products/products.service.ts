// product.service.ts

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';
 // Importación corregida
 import { In } from 'typeorm';

 
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async findMany(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        id: In(ids),
      },
    });
    return products;
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto.name) {
      throw new Error('El nombre es requerido');
    }
  
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number, limit: number) {
    const products = await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    console.log('Productos encontrados:', products);
    return products;
  }


  async save(product){
    await this.productRepository.save(product);
  }
  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({id:id});
    console.log(product);
    if(!product){
      throw new Error('Producto no encontrado!!!!!!!!!!');
    }
      return product;
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


  async uploadFile(file: UploadFileDto, id:string){
    const url= await this.fileUploadService.uploadFile({
      filedname: file.filedname,
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });

    await this.productRepository.update(id, {imgUrl: url});
    return {imgUrl:url};
    
  }

}

