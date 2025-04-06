import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-ecommerce-db'),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
