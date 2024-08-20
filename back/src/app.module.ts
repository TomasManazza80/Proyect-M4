import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import typeormConfig from './config/data-source';
import { SpeedsModule } from './speeds/speeds.module';
import { CloudinaryService } from './service/cloudinary/cloudinary.service';
import { FileUploadModule } from './file-upload/file-upload.module';

import { SharedModule } from './shared/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { sqliteDataSourceConfig } from 'test/typeorm-testing-config';

@Module({
  imports: [
    SpeedsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true,
      load: [typeormConfig, sqliteDataSourceConfig, ()=>({
        enviroment: process.env.enviroment || 'TEST',
      })]

    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('enviroment') === 'TEST' ? configService.get('sqlite') : configService.get('postgress'),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Reemplaza con la clave de tu JWT
        signOptions: { expiresIn: '3600s' }, // Ajusta el tiempo de expiración según tus necesidades
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    FileUploadModule,
    SharedModule,
  ],
  controllers:[AppController],
  providers: [CloudinaryService, AppService],
})
export class AppModule {}