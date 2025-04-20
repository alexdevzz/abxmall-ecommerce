import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Category } from 'src/modules/categories/schemas/category.schema'

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
    minlength: 4,
    maxlength: 10,
    unique: true,
    trim: true,
    blank: false,
  })
  sku: string

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 255,
    trim: true,
    blank: false,
  })
  name: string

  @Prop({
    minlength: 4,
    maxlength: 500,
    trim: true,
  })
  description: string

  @Prop({
    required: true,
    min: 0,
  })
  price: number

  @Prop({
    required: true,
    min: 0,
  })
  weight: number

  @Prop({
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un valor entero',
    },
  })
  stock: number

  @Prop({
    type: [{ type: 'ObjectId', ref: 'Category' }],
  })
  categories: Category[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
