import { Entity, PrimaryGeneratedColumn,ManyToMany,OneToOne, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)// aca tenemos que determinar cual de las propiedades de order necesitamos, en este caso orderDetail
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'products' })
  products: Product[];
}