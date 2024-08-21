import { IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ProductId {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'id of the user',
    required: true,
  })
  @IsString()
  @IsUUID()
  userId: string;



  @ApiProperty({
    type: Array,
    description: 'list of products',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductId)
  products: ProductId[];
}