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

@Module({
  imports: [
    SpeedsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
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
  providers: [CloudinaryService],
})
export class AppModule {}