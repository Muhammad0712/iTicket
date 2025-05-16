import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminDocument } from "../admin/schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { LogInDto } from "./dto/login.dto";
import { AdminService } from "../admin/admin.service";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AdminAuthService {
  constructor(
    private adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_owner: admin.is_creator,
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

  async logInAdmin(logInDto: LogInDto, res: Response) {
    const admin = await this.adminService.findByEmail(logInDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const isValidPassword = await bcrypt.compare(
      logInDto.password,
      admin.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await admin.save();
    return {
      message: "Welcome to iTicket site",
      admin: admin._id,
      access_token: accessToken,
    };
  }

  async logOutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!adminData) {
      throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi1!");
    }
    const admin = await this.adminService.findByEmail(adminData.email);
    admin!.refresh_token = "";
    await admin?.save();
    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out succesfully!",
    };
    return response;
  }

  async refreshToken(refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    const admin = await this.adminService.findOne(decodedToken["id"]);
    if (!admin) {
      throw new NotFoundException("Admin not found!");
    }
    const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: admin.id,
      access_token: accessToken,
    };
    return response;
  }
}
