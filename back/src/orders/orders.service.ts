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
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ProductResponseDto } from 'src/products/dto/response-product.dto';



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
      total += Number(product.price);
    }
    return total;
  }


  async create (body:any): Promise<Order> {
    const { userId, products } = body;
  
    // Validar que el usuario exista
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    // Validar que los productos existan y calcular el total
    const productIds = products.map((product) => product.id);
    const productsData = await this.productsService.findMany(productIds);
    const total = this.calcularTotal(productsData);
  
    // Crear el pedido
    const order = new Order();
    order.user = userId;
    order.date = new Date();
  
    //crea el order detail:
    const orderDetail = new OrderDetail();
    orderDetail.order = order; // Establece la relación con el order
  
    const productsFound = [];
    for (const product of productsData){
      const producto = await this.productsService.findOne(product.id);
      productsFound.push(producto);
    }
  
    orderDetail.price = total;
    orderDetail.products = productsFound;//arreclo de profuctos;
  
    // Establece la relación inversa en el order
    order.orderDetail = orderDetail;
  
    await this.orderDetailsService.create(orderDetail);
  
    // Guardar el pedido en la base de datos
    await this.orderRepository.save(order);
  
    return order;
  }

 

  async update(id: string, updateOrderDto: UpdateOrderDto) {
  
  
    return "se actualizó una orden, terminar codigo";
  }
  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });
      if (!order) {
        throw new Error('LA ORDER NO SE PUDO ENCONTRAR');
      }
  
      const orderDetail = await this.orderDetailsService.findOne( order.orderDetail?.id );
      if (!orderDetail) {
        throw new Error('EL ORDER DETAIL NO SE PUDO ENCONTRAR');
      }
      
      console.log('ESTOS SON LOS PRODUCTOS:', orderDetail.products);
      return {
        order_id: order.id,
        date: order.date,
        orderDetail: orderDetail,
        productos: orderDetail.products
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener la order y el order detail');
    }
  }

  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new Error('Order not found');
    }
    await this.orderRepository.remove(order);
  }

}
