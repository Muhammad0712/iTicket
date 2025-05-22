import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type VenueTypesDocument = HydratedDocument<VenueTypes>;

@Schema()
export class VenueTypes {
  @Prop()
  venue_id: number;

  @Prop()
  type_id: string;
}

export const VenueTypesSchema = SchemaFactory.createForClass(VenueTypes);
