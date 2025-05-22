import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type VenuePhotoDocument = HydratedDocument<VenuePhoto>;

@Schema()
export class VenuePhoto {
  @Prop()
  venue_id: number;

  @Prop()
  url: string;
}

export const VenuePhotoSchema = SchemaFactory.createForClass(VenuePhoto);
