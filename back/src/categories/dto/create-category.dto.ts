import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Nombre de la categoría',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Descripción de la categoría',
    required: false,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description?: string;
}