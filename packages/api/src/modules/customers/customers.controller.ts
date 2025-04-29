import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { CreateOrderDto } from '../orders/dto/create-order.dto'
import { OrdersService } from '../orders/orders.service'

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly ordersService: OrdersService
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto)
  }

  @Post(':id/orders')
  async addOrder(@Param('id') idCustomer: string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, idCustomer)
  }

  @Get()
  findAll() {
    return this.customersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOneById(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.updateOneById(id, updateCustomerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.removeOneById(id)
  }
}
