import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @ResponseMessage('product created successfully')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ResponseMessage('products retrieved successfully')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('product retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @ResponseMessage('product updated successfully')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateOneById(id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage('product deleted successfully')
  remove(@Param('id') id: string) {
    return this.productsService.removeOneById(id);
  }
}
