import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { OrderStatus } from '../enum/order-status.enum'
import { Customer } from 'src/modules/customers/schemas/customer.schema'

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    min: 0,
  })
  ammount: number

  @Prop({
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 500,
  })
  shippingAddress: string

  @Prop({
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 500,
  })
  orderAddress: string

  @Prop({
    trim: true,
    required: true,
    minlength: 7,
    maxlength: 50,
  })
  orderEmail: string

  @Prop({
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 20,
    enum: Object.values(OrderStatus),
    default: OrderStatus.CREATED,
  })
  orderStatus: string

  @Prop({
    required: true,
    minlength: 4,
    maxlength: 10,
    unique: true,
    trim: true,
  })
  sku: string

  @Prop({
    type: [{ type: 'ObjectId', ref: 'Customer' }],
  })
  customer: Customer
}

export const OrderSchema = SchemaFactory.createForClass(Order)
