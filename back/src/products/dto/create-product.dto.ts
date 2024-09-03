import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateProductDto{
    @ApiProperty({
        type: String,
        description: 'the name of the product',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number,
        description: 'the price of the product',
        required: true,
    })
    @IsNumber()
    price:number;

    @ApiProperty({
        type: String,
        description: 'the description of the product',
        required: false,
    })
    @IsString()
    description:string;

    @ApiProperty({
        type: Number,
        description: 'the stock of the product',
        required: false,
    })
    @IsNumber()
    stock:number;

    @ApiProperty({
        type: String,
        description: 'the image URL of the product',
        required: false,
    })
    @IsString()
    imgUrl:string;
}