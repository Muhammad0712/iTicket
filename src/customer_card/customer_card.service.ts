import { Injectable } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../customer/schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerCardService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}
  create(createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerModel.create(createCustomerCardDto);
  }

  findAll() {
    return this.customerModel.find();
  }

  findOne(id: number) {
    return this.customerModel.findById(id);
  }

  update(id: number, updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerCardDto);
  }

  remove(id: number) {
    return this.customerModel.findByIdAndDelete(id);
  }
}
