import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Customer } from './schemas/customer.schema'
import { Model } from 'mongoose'

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = new this.customerModel(createCustomerDto)
    return newCustomer.save()
  }

  async findAll() {
    return this.customerModel.find()
  }

  async findOneById(id: string) {
    return this.customerModel.findById(id)
  }

  async updateOneById(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true })
  }

  async removeOneById(id: string) {
    return this.customerModel.findByIdAndDelete(id)
  }
}
