import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './schemas/product.schema'
import { Model, Types } from 'mongoose'
import { Category } from '../categories/schemas/category.schema'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto)
    return newProduct.save()
  }

  async findAll() {
    return this.productModel.find().populate({
      path: 'categories',
      select: '-products',
    })
  }

  async findOneById(id: string) {
    return this.productModel.findById(id).populate({
      path: 'categories',
      select: '-products',
    })
  }

  async updateOneById(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    })
  }

  async removeOneById(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }

  async addCategoryToProduct(idProduct: string, idCategory: string) {
    const product = await this.productModel.findById(idProduct)
    const category = await this.categoryModel.findById(idCategory)

    if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    if (!category) throw new HttpException('Category not found', HttpStatus.NOT_FOUND)

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      idProduct,
      { $addToSet: { categories: new Types.ObjectId(idCategory) } },
      { new: true }
    )

    await this.categoryModel.findByIdAndUpdate(
      idCategory,
      { $addToSet: { products: new Types.ObjectId(idProduct) } },
      { new: true }
    )

    return updatedProduct?.populate({
      path: 'categories',
      select: '-products',
    })
  }
}
