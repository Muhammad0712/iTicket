import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerSchema: Model<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password, email } = createCustomerDto;
    const data = await this.customerSchema.findOne({ email: email });
    if (data) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud!");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const customer = await this.customerSchema.create({
      ...createCustomerDto,
      password: hashed_password,
    });

    return {
      message: "User created succesfully",
      customer,
    };
  }

  findAll() {
    return this.customerSchema.find();
  }

  async findOne(id: number) {
    const customer = await this.customerSchema.findById(id);
    if (!customer) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerSchema.findByIdAndUpdate(
      id,
      updateCustomerDto
    );
    if (!customer) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return customer;
  }

  async remove(id: number) {
    const customer = await this.customerSchema.findByIdAndDelete(id);
    if (!customer) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return {
      message: "Customer deleted succesfully!",
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.customerSchema.findByIdAndUpdate(id, { refresh_token: refreshToken });
  }

  async findByEmail(email: string) {
    return this.customerSchema.findOne({email: email});
  } 

}
