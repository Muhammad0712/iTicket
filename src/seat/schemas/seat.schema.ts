
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop()
  sector: number;

  @Prop()
  row_number: number;

  @Prop()
  number: number;

  @Prop()
  venue_id: number;

  @Prop()
  seat_type_id: number;

  @Prop()
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
