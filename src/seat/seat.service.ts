import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from './schemas/seat.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat.name) private seatSchema: Model<Seat>) {}
  create(createSeatDto: CreateSeatDto) {
    return this.seatSchema.create(createSeatDto);
  }

  findAll() {
    return this.seatSchema.find();
  }

  findOne(id: string) {
    return this.seatSchema.findById(id);
  }

  update(id: string, updateSeatDto: UpdateSeatDto) {
    return this.seatSchema.findByIdAndUpdate(id, updateSeatDto);
  }

  remove(id: string) {
    return this.seatSchema.findByIdAndDelete(id);
  }
}
