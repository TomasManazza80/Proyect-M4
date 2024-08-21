import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middelware/logger.middelware';
import { config } from 'dotenv';
import 'reflect-metadata';
import { CategoriesSpeed } from './speeds/categories/categories.seed';
import { ProductsSpeed } from './speeds/products/products.speed';
import { auth0Config } from './config/auth0.config';
import {auth} from 'express-openid-connect';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);

  app.use(
    auth({
      ...auth0Config,
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  // const swaggerConfig = new DocumentBuilder()
  // .setTitle('PM4BE-tomasanazza20')
  // .setDescription('The PM4BE-tomasanazza20 API ')
  // .setVersion('1.0')
  // .build();


  // const categoriesSpeed = app.get(CategoriesSpeed);
  // await categoriesSpeed.seed();
  console.log('categorias insertadas correctamente proceso finalizado');
  console.log('categorias insertadas correctamente proceso finalizado');

  const productsSpeed = app.get(ProductsSpeed);
  await productsSpeed.seed();  
  console.log('productos insertadss correctamente proceso finalizado');

  await app.listen(3000);
}
bootstrap();
