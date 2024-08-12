import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { IsString } from 'class-validator';

export class UpdateOrderDetailDto {
    @IsString()
    id: string;

    // other properties...
}