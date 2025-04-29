import { forwardRef, Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from './schemas/customer.schema'
import { OrdersModule } from '../orders/orders.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    forwardRef(() => OrdersModule),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [MongooseModule],
})
export class CustomersModule {}
