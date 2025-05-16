import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminSchema: Model<Admin>,
    private readonly jwtService: JwtService
  ) {}

  async findByEmail(email: string) {
    return this.adminSchema.findOne({email: email})
  }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const data = await this.adminSchema.findOne({ email });
    if (data) {
      throw new BadRequestException("bunday emailli foydalanuvchi mavjud!");
    }
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas!");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const admin = await this.adminSchema.create({
      ...createAdminDto,
      password: hashed_password,
    });
    return {
      message: "Admin created succesfully!",
      admin,
    };
  }

  findAll() {
    return this.adminSchema.find();
  }

  async findOne(id: string) {
    const admin = await this.adminSchema.findById(id);
    if (!admin) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminSchema.findByIdAndUpdate(id, updateAdminDto);
    if (!admin) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return admin;
  }

  async remove(id: string) {
    const admin = await this.adminSchema.findByIdAndDelete(id);
    if (!admin) {
      throw new BadRequestException("Foydalanuvchi topilmadi!");
    }
    return {
      message: "Admin deleted succesfully!",
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.adminSchema.findByIdAndUpdate(id, {refresh_token: refreshToken})
  }
}
