import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop()
  cart_id: number;

  @Prop({default: new Date()})
  created_at: Date;

  @Prop()
  finished: Date;

  @Prop()
  payment_method_id: number;

  @Prop()
  delivery_method_id: number;

  @Prop()
  discount_coupon_id: number;

  @Prop()
  status_id: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
