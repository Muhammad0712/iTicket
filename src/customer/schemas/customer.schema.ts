
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Gender } from "../../constants";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({
    unique: true
  })
  phone_number: string;

  @Prop({
    unique: true
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  birth_date: Date;

  @Prop({
    enum: Gender
  })
  gender: string;

  @Prop()
  lang_id: number;

  @Prop({
    default: true
  })
  is_active: boolean;

  @Prop({
    default: ""
  })
  activation_link: string;

  @Prop({
    default: ""
  })
  refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
