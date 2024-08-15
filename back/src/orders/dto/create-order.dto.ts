import { IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductId {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductId)
  products: ProductId[];
}