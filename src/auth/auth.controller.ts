import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AdminAuthService } from "./admin.auth.service";
import { LogInDto } from "./dto/login.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CustomerAuthService } from "./customer.auth.service";
import { CreateCustomerDto } from "../customer/dto/create-customer.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly customerAuthService: CustomerAuthService
  ) {}

  //______________________________ADMIN__________________________________
  @Post("admin/log-in")
  @HttpCode(200)
  async loginAdmin(
    @Body() logInAdminDto: LogInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.logInAdmin(logInAdminDto, response);
  }

  @Post("admin/log-out")
  @HttpCode(200)
  logoutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.logOutAdmin(refreshToken, res);
  }

  @HttpCode(200)
  @Post("admin/refresh")
  refreshAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.refreshToken(refreshToken, res);
  }
  //______________________________ADMIN-END______________________________

  //______________________________CUSTOMER__________________________________

  @Post("customer/register")
  @HttpCode(201)
  async registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerAuthService.register(createCustomerDto);
  }

  @Post("customer/log-in")
  @HttpCode(200)
  async loginCustomer(
    @Body() logInDto: LogInDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.customerAuthService.logInCustomer(logInDto, response);
  }

  @Post("customer/log-out")
  @HttpCode(200)
  logoutCustomer(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.logOutCustomer(refreshToken, res);
  }

  @HttpCode(200)
  @Post("customer/refresh")
  refreshCustomer(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.refreshToken(refreshToken, res);
  }
  //______________________________CUSTOMER-END______________________________
}
