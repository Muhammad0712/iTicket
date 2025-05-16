import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type DistrictDocument = HydratedDocument<District>;

@Schema()
export class District {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  number: string;

  @Prop()
  year: string;

  @Prop()
  month: string;

  @Prop()
  is_active: boolean;

  @Prop()
  is_main: boolean;

  @Prop()
  customerId: string;

}

export const DistrictSchema = SchemaFactory.createForClass(District);
