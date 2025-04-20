import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ResponseMetadata } from 'src/common/decorators/response.decorator'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ResponseMetadata('category created successfully')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  @ResponseMetadata('all categories retrieved successfully')
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @ResponseMetadata('category retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneById(id)
  }

  @Patch(':id')
  @ResponseMetadata('category updated successfully')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateOneById(id, updateCategoryDto)
  }

  @Delete(':id')
  @ResponseMetadata('category deleted successfully')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeOneById(id)
  }
}
