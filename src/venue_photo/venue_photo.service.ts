import { Injectable } from '@nestjs/common';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VenuePhoto } from './schemas/venue_photo.schema';
import { Model } from 'mongoose';

@Injectable()
export class VenuePhotoService {
  constructor(@InjectModel(VenuePhoto.name) private venuePhotoSchema: Model<VenuePhoto>) {}
  create(createVenuePhotoDto: CreateVenuePhotoDto) {
    return this.venuePhotoSchema.create(createVenuePhotoDto);
  }

  findAll() {
    return this.venuePhotoSchema.find();
  }

  findOne(id: string) {
    return this.venuePhotoSchema.findById(id);
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoSchema.findByIdAndUpdate(id, updateVenuePhotoDto);
  }

  remove(id: string) {
    return this.venuePhotoSchema.findByIdAndDelete(id);
  }
}
