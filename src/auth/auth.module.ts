import { Module } from "@nestjs/common";
import { AdminAuthService } from "./admin.auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { CustomerAuthService } from "./customer.auth.service";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, CustomerModule],
  controllers: [AuthController],
  providers: [AdminAuthService, CustomerAuthService],
})
export class AuthModule {}
