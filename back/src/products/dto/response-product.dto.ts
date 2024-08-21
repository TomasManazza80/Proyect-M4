import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto{
    @ApiProperty({
        type: String,
        description: 'the name of product',
        required: true,
      })
    name:string;


    @ApiProperty({
        type: Number,
        description: 'the price of product',
        required: true,
      })
    price:number;

    constructor(partial: Partial<ProductResponseDto>){
        const {name, price} = partial;
        this.name=name;
        this.price=price;
    }
}