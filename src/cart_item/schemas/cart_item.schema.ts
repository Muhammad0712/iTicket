import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
  @Prop()
  ticket_id: number;

  @Prop()
  cart_id: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
