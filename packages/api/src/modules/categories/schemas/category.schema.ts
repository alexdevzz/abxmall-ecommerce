import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

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
}

export const CategorySchema = SchemaFactory.createForClass(Category)
