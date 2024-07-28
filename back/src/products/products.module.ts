// products.module.ts

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import ProductRepository from "./products.repository"; // Importación del repositorio

@Module({
  controllers: [ProductsController], // Declaración del controlador
  providers: [
    ProductsService, // Declaración del servicio
    ProductRepository, // Declaración del repositorio como proveedor
    ],
    exports:[ProductRepository, ProductsService],
})
export class ProductsModule {}
