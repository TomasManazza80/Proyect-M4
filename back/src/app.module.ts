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


@Module({
  imports: [
    SpeedsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService)=>ConfigService.get('typeorm'),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
  ],
})
export class AppModule {}
