import { Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerAddress } from "./schemas/customer_address.schema";
import { Model } from "mongoose";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private customerAddressSchema: Model<CustomerAddress>
  ) {}

  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressSchema.create(createCustomerAddressDto);
  }

  findAll() {
    return this.customerAddressSchema.find();
  }

  findOne(id: string) {
    return this.customerAddressSchema.findById(id);
  }

  update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAddressSchema.findByIdAndUpdate(id, updateCustomerAddressDto);
  }

  remove(id: string) {
    return this.customerAddressSchema.findByIdAndDelete(id);
  }
}
