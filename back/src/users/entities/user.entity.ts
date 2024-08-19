import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'; // Para validación

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 60 }) // Recomendado para almacenar hashes de contraseñas
  password: string;

  @Column({ nullable: true }) // Considera utilizar un tipo de dato más específico
  phone: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}