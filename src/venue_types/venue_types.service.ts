import { Injectable } from '@nestjs/common';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenueTypes } from './schemas/venue_type.schema';
import { Model } from 'mongoose';

@Injectable()
export class VenueTypesService {
  constructor(@InjectModel(VenueTypes.name) private venueTypeSchema: Model<VenueTypes>) {}
  create(createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeSchema.create(createVenueTypeDto);
  }

  findAll() {
    return this.venueTypeSchema.find();
  }

  findOne(id: string) {
    return this.venueTypeSchema.findById(id);
  }

  update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypeSchema.findByIdAndUpdate(id, updateVenueTypeDto);
  }

  remove(id: string) {
    return this.venueTypeSchema.findByIdAndDelete(id);
  }
}
