import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { orderDetailEntity } from '../../order-details/entities/order-detail.entity'; //poner orderdetail entidad

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @OneToOne(() => orderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetail: orderDetailEntity;
}