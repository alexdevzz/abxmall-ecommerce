import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order } from './schema/orders.schema'
import { Model } from 'mongoose'
import { CreateOrderDto } from './dto/create-order.dto'
import { Customer } from '../customers/schemas/customer.schema'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>
  ) {}

  async create(createOrderDto: CreateOrderDto, idCustomer: string) {
    const newOrder = new this.orderModel(createOrderDto)
    const customer = await this.customerModel.findById(idCustomer)

    if (!customer) throw new HttpException('Customer not found', HttpStatus.NOT_FOUND)

    newOrder.customer = customer
    newOrder.shippingAddress = customer.billingAddress
    newOrder.orderEmail = customer.email

    const savedOrder = await newOrder.save()

    await this.customerModel.findByIdAndUpdate(idCustomer, { $push: { orders: savedOrder } }, { new: true })

    return savedOrder.populate({
      path: 'customer',
      select: '-orders',
    })
  }

  async findAll() {
    return this.orderModel.find().populate({
      path: 'customer',
      select: '-orders',
    })
  }

  async findOneById(id: string) {
    return this.orderModel.findById(id).populate({
      path: 'customer',
      select: '-orders',
    })
  }

  async removeOneById(id: string) {
    return this.orderModel.findByIdAndDelete(id).populate({
      path: 'customer',
      select: '-orders',
    })
  }
}
