import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';//conectar con la entidad de order

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') //aca el id es un string porque usamos un uuid el cual crea un id unico usando una cadena de texto en lugar de un numero
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column('integer')
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column('text')
  address: string;

  @Column({ length: 50 })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}