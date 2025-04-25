import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Order } from 'src/modules/orders/schema/orders.schema'

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop({
    required: true,
    minlength: 7,
    maxlength: 50,
    unique: true,
    trim: true,
  })
  email: string

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  })
  name: string

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  })
  lastName: string

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 500,
    trim: true,
  })
  billingAddress: string

  @Prop({
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  })
  country: string

  @Prop({
    required: true,
    minlength: 6,
    maxlength: 20,
    trim: true,
    NaN: false,
  })
  phone: string

  @Prop({
    type: [{ type: 'ObjectId', ref: 'Order' }],
  })
  orders: Order[]
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
