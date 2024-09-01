import { IsArray, IsDate, IsString, IsUUID, ValidateNested } from "class-validator";
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
    type: String,
    description: 'date of the user',
    required: true,
  })

  @IsDate()
  date: Date;
}