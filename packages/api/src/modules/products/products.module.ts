import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from './schemas/product.schema'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
