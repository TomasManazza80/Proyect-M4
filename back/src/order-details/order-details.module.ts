// order-details.module.ts
import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity'; //  ORDER DETAIL ENTIDAD



@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
  ],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}