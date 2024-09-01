import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';//conectar con la entidad de category
import { OrderDetail } from '../../order-details/entities/order-detail.entity';//conectar con la entidad de order-detail

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('integer', { nullable: false })
  stock: number;

  @Column({ default: 'https://example.com/default-image.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)//aca se ve como  queremos acceder a los productos de una order detail, usando orderDetail.products
  orderDetails: OrderDetail[];
}