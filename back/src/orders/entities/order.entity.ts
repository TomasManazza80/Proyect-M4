import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { orderDetailEntity } from '../../order-details/entities/order-detail.entity'; //poner orderdetail entidad

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)  //de ManyToOne a ManytoMany
  user: User;

  @Column({ type: 'date', nullable: false }) // de Column  a  OneToOne
  date: Date;

  @ManyToMany(() => orderDetailEntity, (orderDetail) => orderDetail.order) //OneToOne a manytomany
  orderDetail: orderDetailEntity;
}