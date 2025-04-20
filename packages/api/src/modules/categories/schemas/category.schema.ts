import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Product } from 'src/modules/products/schemas/product.schema'

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
    trim: true,
    blank: false,
  })
  name: string

  @Prop({
    required: false,
    minlength: 4,
    maxlength: 500,
    trim: true,
  })
  description: string

  @Prop({
    type: [{ type: 'ObjectId', ref: 'Product' }],
  })
  products: Product[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
