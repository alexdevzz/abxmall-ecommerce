import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCustomerDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(50)
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  lastName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  billingAddress: string

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  country: string

  @IsPhoneNumber('CU')
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  phone: string
}
