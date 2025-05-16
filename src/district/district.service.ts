import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schema";
import mongoose, { Model } from "mongoose";
import { RegionService } from "../region/region.service";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    private readonly regionService: RegionService
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const { regionId } = createDistrictDto;
    if (!mongoose.isValidObjectId(regionId)) {
      throw new BadRequestException("Bunday region yo'q!");
    }
    const region = await this.regionService.findOne(regionId);
    if (!region) {
      throw new BadRequestException("Bunday region yo'q!")
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find();
  }

  findOne(id: number) {
    return this.districtSchema.findById(id);
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.districtSchema.findByIdAndUpdate();
  }

  remove(id: number) {
    return this.districtSchema.findByIdAndDelete(id);
  }
}
