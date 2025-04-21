import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Category } from './schemas/category.schema'
import { Model } from 'mongoose'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryModel(createCategoryDto)
    return newCategory.save()
  }

  async findAll() {
    return this.categoryModel.find().populate({
      path: 'products',
      select: '-categories',
    })
  }

  async findOneById(id: string) {
    return this.categoryModel.findById(id).populate({
      path: 'products',
      select: '-categories',
    })
  }

  async updateOneById(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true })
  }

  async removeOneById(id: string) {
    return this.categoryModel.findByIdAndDelete(id)
  }
}
