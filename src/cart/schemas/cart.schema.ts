import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  customer_id: number;

  @Prop()
  created_at: Date;

  @Prop()
  finished_at: Date;

  @Prop()
  status_id: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
