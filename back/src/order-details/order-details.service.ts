import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return this.orderDetailRepository.save(orderDetail);
  }

  async findAll() {
    return this.orderDetailRepository.find();
  }
 async save(orderDe){
  await this.orderDetailRepository.save(orderDe);
 }
  async findOne(id: string) {
    const orderDetail = await this.orderDetailRepository.findOneBy({ id });
    if (!orderDetail) {
      console.log(`Order detail with ID ${id} not found!`);
    }
    return orderDetail;
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.findOne(id);
    this.orderDetailRepository.merge(orderDetail, updateOrderDetailDto);
    return this.orderDetailRepository.save(orderDetail);
  }


  async remove(id: string) {
    const orderDetail = await this.findOne(id);
    return this.orderDetailRepository.remove(orderDetail);
  }  
}

