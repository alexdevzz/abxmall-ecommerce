import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ResponseMetadata } from 'src/common/decorators/response.decorator'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @ResponseMetadata('product created successfully')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Get()
  @ResponseMetadata('all products retrieved successfully')
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ResponseMetadata('product retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id)
  }

  @Patch(':id')
  @ResponseMetadata('product updated successfully')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateOneById(id, updateProductDto)
  }

  @Delete(':id')
  @ResponseMetadata('product deleted successfully')
  remove(@Param('id') id: string) {
    return this.productsService.removeOneById(id)
  }
}
