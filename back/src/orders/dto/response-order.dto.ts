import {OrderDetail} from '../../order-details/entities/order-detail.entity';
import {Order} from '../../orders/entities/order.entity'
export class OrderResponseDto {
        constructor(order: Order, orderDetail: OrderDetail) {
          this.order = {
            id: order.id,
            date: order.date,
          };
      
          this.orderDetail = {
            id: orderDetail.id,
            price: orderDetail.price,
            products: orderDetail.products,
          };
        }
      
        order: {
          id: string;
          date: Date;
        };
      
        orderDetail: {
          id: string;
          price: number;
          products: any[];
        };
      }