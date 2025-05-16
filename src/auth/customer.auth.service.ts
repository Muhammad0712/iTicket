import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "../customer/customer.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";
import {
  Customer,
  CustomerDocument,
} from "../customer/schemas/customer.schema";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LogInDto } from "./dto/login.dto";
import { Response } from "express";

@Injectable()
export class CustomerAuthService {
  constructor(
    private customerService: CustomerService,
    private readonly jwtService: JwtService,
    @InjectModel(Customer.name) private customerSchema: Model<Customer>
  ) {}

  async generateTokens(customer: CustomerDocument) {
    const payload = {
      id: customer.id,
      email: customer.email,
      phone_number: customer.phone_number,
      is_active: customer.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createCustomerDto: CreateCustomerDto) {
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

  async logInCustomer(logInDto: LogInDto, res: Response) {
    const customer = await this.customerService.findByEmail(logInDto.email);
    if (!customer) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const isValidPassword = await bcrypt.compare(
      logInDto.password,
      customer.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const { accessToken, refreshToken } = await this.generateTokens(customer);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    customer.refresh_token = hashed_refresh_token;
    await customer.save();
    return {
      message: "Welcome to iTicket site",
      customer: customer._id,
      access_token: accessToken,
    };
  }

  async logOutCustomer(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!customerData) {
      throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi1!");
    }
    const customer = await this.customerService.findByEmail(customerData.email);
    customer!.refresh_token = "";
    await customer?.save();
    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out succesfully!",
    };
    return response;
  }

  async refreshToken(refresh_token: string, res: Response) {
      const decodedToken = await this.jwtService.decode(refresh_token);
      const customer = await this.customerService.findOne(decodedToken["id"]);
      if (!customer) {
        throw new NotFoundException("Customer not found!");
      }
      const tokenMatch = await bcrypt.compare(
        refresh_token,
        customer.refresh_token
      );
      if (!tokenMatch) {
        throw new ForbiddenException("Forbidden");
      }
  
      const { accessToken, refreshToken } = await this.generateTokens(customer);
      const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
      await this.customerService.updateRefreshToken(customer.id, hashed_refresh_token);
  
      res.cookie("refresh_token", refreshToken, {
        maxAge: Number(process.env.COOKIE_TIME),
        httpOnly: true,
      });
  
      const response = {
        message: "User refreshed",
        userId: customer.id,
        access_token: accessToken,
      };
      return response;
    }
}
