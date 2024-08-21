import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateProductDto{
    @ApiProperty({
        type: String,
        description: 'the name of the product',
        required: true,
      })
    @IsString()
    name:string;


    @ApiProperty({
        type: String,
        description: 'the price of the product',
        required: true,
      })
    @IsNumber()
    price:number;
}