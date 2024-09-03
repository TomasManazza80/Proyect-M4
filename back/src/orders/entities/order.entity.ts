import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';
import {UserResponseDto} from "../../users/dto/response-user-dto";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserResponseDto;

  @Column({ type: 'date', nullable: false })
  date: Date;
  

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({name: 'orderDetail_Id'})
  orderDetail: OrderDetail;

}
