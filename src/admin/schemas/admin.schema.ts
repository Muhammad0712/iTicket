import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  full_name: string;

  @Prop({
    unique: true
  })
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  password: string;

  @Prop({default: ""})
  refresh_token: string;

  @Prop({
    default: true
  })
  is_active: boolean;

  @Prop({
    default: false
  })
  is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
