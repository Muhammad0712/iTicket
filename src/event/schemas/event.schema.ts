import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Mongoose, Types } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop()
  start_time: Date;

  @Prop()
  finish_date: Date;

  @Prop()
  finish_time: Date;

  @Prop()
  info: string;

  @Prop()
  event_type_id: number;

  @Prop()
  human_category_id: number;

  @Prop()
  venue_id: number;

  @Prop()
  lang_id: number;

  @Prop()
  release_date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
