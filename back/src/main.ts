import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middelware/logger.middelware';
import { config } from 'dotenv';
import 'reflect-metadata';
import { CategoriesSpeed } from './speeds/categories/categories.seed';
import { ProductsSpeed } from './speeds/products/products.speed';


config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  const categoriesSpeed = app.get(CategoriesSpeed);
  await categoriesSpeed.seed();
  console.log('categorias insertadas correctamente proceso finalizado');

  const productsSpeed = app.get(ProductsSpeed);
  await productsSpeed.seed();  
  console.log('productos insertadss correctamente proceso finalizado');

  await app.listen(3001);
}
bootstrap();
