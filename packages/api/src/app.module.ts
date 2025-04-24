import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsModule } from './modules/products/products.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { CustomersModule } from './modules/customers/customers.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-ecommerce-db'),
    ProductsModule,
    CategoriesModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
