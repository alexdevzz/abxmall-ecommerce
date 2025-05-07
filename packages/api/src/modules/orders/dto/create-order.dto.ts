import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  sku: string

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  orderAddress: string
}
