import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './schema/orders.schema'
import { Model } from 'mongoose'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return this.orderModel.find()
  }

  async findOneById(id: string) {
    return this.orderModel.findById(id)
  }

  async removeOneById(id: string) {
    return this.orderModel.findByIdAndDelete(id)
  }
}
