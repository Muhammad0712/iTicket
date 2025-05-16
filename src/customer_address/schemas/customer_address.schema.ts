import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose, Types } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  @Prop()
  name: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: number;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;

  @Prop()
  customerId: string;

  @Prop()
  regionId: string

  @Prop()
  CustomerAddressId: string;
}

export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress);
