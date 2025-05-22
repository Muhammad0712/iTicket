import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type VenueDocument = HydratedDocument<Venue>;

@Schema()
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone: string;

  @Prop()
  schema: string;

  @Prop()
  region_id: number;

  @Prop()
  district_id: number;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
