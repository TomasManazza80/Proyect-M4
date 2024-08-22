import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { OrderDetailsService } from '../order-details/order-details.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailDto } from '../order-details/dto/create-order-detail.dto';
import { OrederResponseDto } from './dto/response-order.dto';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productsService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  calcularTotal(products: any[]): number {
    let total = 0;
    for (const product of products) {
      total += product.price;
    }
    return total;
  }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOne(userId);
  
    const order = {
      user: user,
      date: new Date(),
    };
  
    const orderOfEntity = await this.orderRepository.save(
      this.orderRepository.create(order),
    );
    const total = await this.calcularTotal(products);
    const orderDetail = new CreateOrderDetailDto();
  
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderOfEntity;
  
    const orderEntity = await this.orderDetailsService.create(orderDetail);
  
    return new OrederResponseDto(orderEntity);
  }
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({where: { id }});
  
    if (!order) {
      throw new Error('Order not found');
    }
  
    const { userId, products } = updateOrderDto;

    order.id=userId;

    if (products) {
      const total = await this.calcularTotal(products);
      order.orderDetail.price = total; // Actualiza el total en OrderDetail
    }
  
    await this.orderRepository.save(order);
  
    return order;
  }
  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    const orderDetails = await this.orderDetailsService.findOne(
      order.id,
    );
    return orderDetails;
  }


  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new Error('Order not found');
    }
    await this.orderRepository.remove(order);
  }
}
